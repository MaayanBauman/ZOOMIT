import Category from 'models/Category/Category';

export const categoryNameById = (categories: Category[], categoryId: string) => {
    const category = categories.filter((category: Category) => category.id === categoryId);
    return category[0].name;
}