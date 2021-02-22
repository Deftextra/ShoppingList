import { ListItem } from "./list-item";
import { v4 as uuidv4 } from 'uuid';

export class ProductList {

    public listId: number = uuidv4();

    private count: number = 0;

    //TODO: make only this part enumerable and make private
    public productItems: ListItem[] = [];
    
    //TODO: We should probaby create a move Item method
    // moveItem()

    addItem(itemName: string, HighPriority: boolean = false): number {
        this.count++;
        const item: ListItem = {
            ItemID: this.count,
            ItemName: itemName,
            ListID: this.listId,
            HighPriority: HighPriority,
            Index: this.productItems.length
        }

        return this.productItems.push(item);
    }

    public getSize() {
        return this.productItems.length;
    }

    public DeleteProduct(productId: number): ListItem {
        const index = this.productItems.findIndex((item) => item.ItemID === productId);

        //TODO: Change Index property when deleting.

        if (index === -1) {
            // something wrong has happend
            // TODO: throw exception
        }

        return this.productItems.splice(index, 1).shift();
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
        if (newItemName)
        {
            this.productItems[index].ItemName = newItemName
        }

        if (newItemPriority !== undefined)
        {
            this.productItems[index].HighPriority = newItemPriority;
        }

    }

    public moveItemDown(productId: number) {
        const index = this.productItems.findIndex((item) => item.ItemID === productId);

        debugger;
        if (index < this.productItems.length - 1) {

            const swapItem = this.productItems[index + 1];

            this.productItems[index].Index++;
            this.productItems[index + 1] = this.productItems[index]

            swapItem.Index--;
            this.productItems[index] = swapItem;
        }
    }

    public moveItemUp(productId: number) {
        const index = this.productItems.findIndex((item) => item.ItemID === productId);

        if (index > 0) {

            const swapItem = this.productItems[index - 1];

            this.productItems[index].Index--;
            this.productItems[index - 1] = this.productItems[index]

            swapItem.Index++;
            this.productItems[index] = swapItem;
        }
    }
}


