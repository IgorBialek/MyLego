export default interface Subset {
    item: {
        no: string;
        name: string;
        type: string
        category_id: number;
    };
    color_id: number;
    quantity: number;
    extra_quantity: number;
    is_alternate: boolean;
    is_counterpart: boolean;
}