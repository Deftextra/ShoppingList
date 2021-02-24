import { ListItem } from "./list-item";
import { v4 as uuidv4 } from 'uuid';

export class ProductList {

    public readonly listId: number;

    private static productListCount: number = 0;

    public productItems: ListItem[] = [];

    private constructor(listId: number) {
        this.listId = listId;

    }

    public static Create(): ProductList {
        return new ProductList(ProductList.productListCount++);
    }


    public addItem(itemName: string, HighPriority: boolean = false): number {

        const item: ListItem = {
            ItemID: uuidv4(),
            ItemName: itemName,
            ListID: this.listId,
            HighPriority: HighPriority,
            Index: this.productItems.length
        }

        if (HighPriority) {
            item.Index = 0;
            for (let index = 1; index < this.productItems.length; index++) {
                this.productItems[index].Index++;
            }
            return this.productItems.unshift(item);
        }

        return this.productItems.push(item);
    }


    public addExistingItem(item: ListItem): number {
        item.Index = this.productItems.length;
        item.ListID = this.listId;

        if (item.HighPriority) {
            item.Index = 0;

            for (let index = 1; index < this.productItems.length; index++) {
                this.productItems[index].Index++;
            }

            return this.productItems.unshift(item);
        }

        return this.productItems.push(item);
    }

    public getSize() {
        return this.productItems.length;
    }

    public DeleteProduct(productId: number): ListItem {
        const index = this.productItems.findIndex((item) => item.ItemID === productId);

        const deletedItem = this.productItems.splice(index, 1).shift();

        for (var i = index; i < this.productItems.length; i++) {
            this.productItems[i].Index--;
        }
        return deletedItem;
    }

    public GetItemById(productId: number): ListItem {
        return this.productItems.find(item => item.ItemID === productId);
    }

    public EditProduct(
        productId: number,
        newItemName?: string,
        newItemPriority?: boolean
    ) {

        const index = this.productItems.findIndex((item) => item.ItemID === productId);
        if (newItemName) {
            this.productItems[index].ItemName = newItemName
        }

        if (newItemPriority) {
            this.productItems[index].HighPriority = newItemPriority;
            this.productItems.unshift(this.DeleteProduct(productId));
            this.productItems[0].Index = 0;

            for (let index = 1; index < this.productItems.length; index++) {
                this.productItems[index].Index++;
            }

            
        }

    }

    public moveItemDown(productId: number): boolean {
        const index = this.productItems.findIndex((item) => item.ItemID === productId);

        if (index < this.productItems.length - 1) {
            if (this.productItems[index].HighPriority &&
                !this.productItems[index + 1].HighPriority) {
                return false;
            }

            const swapItem = this.productItems[index + 1];

            this.productItems[index].Index++;
            this.productItems[index + 1] = this.productItems[index]

            swapItem.Index--;
            this.productItems[index] = swapItem;
            
            return true;
        }
    }

    public moveItemUp(productId: number) {
        const index = this.productItems.findIndex((item) => item.ItemID === productId);

        if (index > 0) {
            if (!this.productItems[index].HighPriority &&
                this.productItems[index - 1].HighPriority) {
                return false;
            }

            const swapItem = this.productItems[index - 1];


            this.productItems[index].Index--;
            this.productItems[index - 1] = this.productItems[index]

            swapItem.Index++;
            this.productItems[index] = swapItem;
            return true;
        }
    }

    public itemIsEndofList(itemId: number): boolean {
        return this.GetItemById(itemId).Index + 1 === this.productItems.length;
    }

    public itemIsStartofList(itemId: number): boolean {
        return this.GetItemById(itemId).Index === 0;
    }

}


