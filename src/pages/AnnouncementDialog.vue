<template>
    <Dialog 
        :dialog-clicked="dialog"
        :add-button="true" 
        @on-dialog-clicked="onCloseDialog()"
        @on-new-clicked="onNewItem()"
    >
        <template v-slot:title>
            {{ title }}
        </template>
        <template v-slot:content>
        <v-form v-model="onValid" ref="form" validate-on="blur">
            <v-row v-for="(item, i) in itens" :key="i">
                <v-text-field 
                    v-if="item.type == 'text'"
                    :label="item.title"
                    hide-details="auto"
                    density="compact"
                    v-model="item.data"
                    :rules="item.validation"
                ></v-text-field>
                <v-select
                    v-else-if="item.type == 'select'"
                    :label="item.title"
                    :items="item.items"
                    :item-title="item.itemText"
                    :item-value="item.itemValue"
                    :loading="item.loading"
                    v-model="item.data"
                    :disabled="item.disable"
                    :rules="item.validation"
                    @update:model-value="item.onChange"
                >
                </v-select>
                <v-row no-gutters v-else>
                    <v-file-input
                        :label="item.title"
                        prepend-icon="mdi-camera"
                        multiple
                        :clearable="false"
                        :rules="item.validation"
                        chips
                        accept="image/png, image/jpeg, image/jpg, image/bmp"
                        @change="onFileChange"
                        @update:model-value="onUpdateImage"
                    >
                    </v-file-input>
                    <v-row no-gutters>
                        <v-col v-for="(image, i) in imagesUrlFile" :key="i">
                            <v-btn variant="text" icon="mdi-close" size="x-small" @click="onClearImage(image.id)"></v-btn>
                            <v-img :width="100" :height="100" :src="image.url"></v-img>
                        </v-col>
                    </v-row>
                </v-row>
            </v-row>
        </v-form>
        </template>
        <template v-slot:actions>
        <v-spacer></v-spacer>
        <ActionButtons 
            :cancel-title="'Cancel'" 
            :confirm-title="'Save'"
            :loading="loading"
            :disable="!onValid"
            @close="onCloseDialog()"
            @confirm="onSaveItem()" 
        />
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import AnnouncementService from '@/service/AnnouncementService';
import { ref, computed, ComputedRef } from 'vue';
import { Announcement } from '@/types/announcement'
import type { IdAndName } from '@/types/idAndName';
import ActionButtons from '@/components/ActionButtons.vue'
import Dialog from '@/components/Dialog.vue'
import CategoryService from '@/service/CategoryService';
import SubCategoryService from '@/service/SubCategoryService'
import { useUserStore } from '@/store/userStore';
import AuthenticationService from '@/service/AuthenticationService';
import { toRefs, watch, Ref } from 'vue'

const props = defineProps<{
    id: number
    announcement: Announcement
    dialog: boolean
}>()

const emit = defineEmits(['onCloseDialog', 'onNewItem'])

const { announcement, id, dialog } = toRefs(props);

interface Item {
    title: string
    data: string|number|Ref<File[]>
    column: string
    items?: ComputedRef<Array<IdAndName>>
    itemText?: string
    itemValue?: string
    onChange?: Function
    loading?: boolean
    validation: Array<(text: string) => string | true>
    disable: boolean | ComputedRef<boolean>
    type: string
}

interface Image {
    id: string,
    url: any,
    file: File
}

let onValid = ref<boolean>(false);
const form = ref();

let loading = ref<boolean>(false);
let subCategoryLoading = false;
const onLoading = () => { loading.value = !loading.value };
const userStore = useUserStore();

let title = ref<string>("");
let description = ref<string>("")
let category = ref<string>("");
let images = ref<Array<File>>()

let imagesUrlFile = ref<Array<Image>>([])

let categories = ref<Array<IdAndName>>([]);
let subCategories = ref<Array<IdAndName>>([]);
const categoriesComputed = computed(() => categories.value)
const subCategoriesComputed = computed(() => subCategories.value)

const onSelectCategory = async(categorySelected: string) => {
    onUpdateCategory(categorySelected)
    onResetSubCategory()
    await getSubCategories()
}

const onUpdateCategory = (categorySelected: string) => {
    category.value = categorySelected;
}

const onResetSubCategory = () => {
    itens.value.forEach(i => {
         if (i.column == "subCategoryId") i.data = "";
    })
}

const onUpdateImage = (e: any) => {
    console.log(e)
}

const onClearImage = (id: string) => {
    const idToRemove = imagesUrlFile.value.findIndex(f => f.id == id)
    imagesUrlFile.value.splice(idToRemove, 1)
}

const onFileChange = async (file: any) => {
    if (!file) {
        return
    }
    const files = file.target.files
    let count = files.length;
    let index = 0;

    const readData = (f: any) => 
        new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result)
            reader.readAsDataURL(f);
        })

    while(count --) {
          const data = await readData(files[index])
          const idDataFile = {
            id: files[index].name,
            url: data,
            file: files[index]
          }
          imagesUrlFile.value.push(idDataFile)
          index++
        }
    
}

const isCategorySelected = computed<boolean>(() => category.value.length == 0);

const itens = ref<Array<Item>>([
    {
        title: "Título",
        data: "",
        column: "title",
        type: "text",
        disable: false,
        validation: [AuthenticationService.requiredField]
    },
    {
        title: "Descrição",
        data: "",
        column: "text",
        type: "text",
        disable: false,
        validation: [AuthenticationService.requiredField]
    },
    {
        title: "Categoria",
        data: "",
        column: "category",
        type: "select",
        items: categoriesComputed,
        itemText: "name",
        itemValue: "name",
        onChange: onSelectCategory,
        disable: false,
        validation: [AuthenticationService.requiredField]
    },
    {
        title: "Sub-Categoria",
        data: "",
        column: "subCategoryId",
        type: "select",
        items: subCategoriesComputed,
        itemText: "name",
        itemValue: "id",
        loading: subCategoryLoading,
        onChange: () => {},
        disable: isCategorySelected,
        validation: [AuthenticationService.requiredField]
    },
    {
        title: "Foto",
        data: "",
        column: "image",
        type: "file-input",
        disable: false,
        validation: [AuthenticationService.requiredField]
    }
])

const itensValues = computed(() => {
    return {
        title: itens.value.find(i => i.column == "title")?.data,
        text: itens.value.find(i => i.column == "text")?.data,
        subCategoryId: itens.value.find(i => i.column == "subCategoryId")?.data,
        images: imagesUrlFile.value.map(i => i.file)
    }
})

const itensForm = () => {
    const title = itensValues.value.title ?? ""
    const text = itensValues.value.text ?? ""
    const personId = userStore.userStored.id
    const subCategory = Number(itensValues.value.subCategoryId)
    const images = itensValues.value.images[0]
    return {
        id: id.value,
        title: title.toString(),
        text: text.toString(),
        personId: personId,
        subCategoryId: subCategory,
        images: images
    }
}

const onCloseDialog = () => {
    emit('onCloseDialog')
}

const onNewItem = async () => {
    emit('onNewItem')
    resetValues()
    await getCategories()
}

const onSaveItem = async () => {
    if (itensForm().id) {
        await onUpdateAnnouncement()
    } else {
        await onSaveAnnouncement();
    }
    onCloseDialog();
}

const onResetValuesBySelectedValues = (item: Announcement) => {
    const entries = Object.entries(item);
    itens.value.forEach(i => i.data = entries.find(e => e[0] == i.column)?.[1])
}

const onSetCategoryAndSubCategoryOnEdit = async (categorySelected: string) => {
    await getCategories();
    onUpdateCategory(categorySelected)
    await getSubCategories();
}

const resetValues = () => {
    category.value = "";
    itens.value.forEach(i => i.data = "");
}

const onSaveAnnouncement = async () => {
    try {
        onLoading();
        await AnnouncementService.save(itensForm());
    } catch (e) {
        console.error(e);
    } finally {
        onLoading();
    }
}

const onUpdateAnnouncement = async () => {
    try {
        onLoading()
        await AnnouncementService.update(itensForm());
    } catch (e) {
        console.error(e);
    } finally {
        onLoading();
    }
}

const getCategories = async () => {
  try {
    let { data } = await CategoryService.getAll();
    categories.value = data;
  } catch (e) {
    console.error(e);
  }
}

const getSubCategories = async () => {
  try {
    subCategoryLoading = true;
    let { data } = await SubCategoryService.getByCategory(category.value);
    subCategories.value = data;
  } catch (e) {
    console.error(e);
  } finally {
    subCategoryLoading = false;
  }
}

watch(dialog, (currDialog) => {
    if (id.value) {
        onResetValuesBySelectedValues(announcement.value)
        onSetCategoryAndSubCategoryOnEdit(announcement.value.category)
    }
})
</script>