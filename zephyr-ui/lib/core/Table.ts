import UI from "../UI";

export default class Table extends UI<HTMLTableElement> {
    rows: UI[];
    columns: UI[];
    head: UI<HTMLTableSectionElement>;
    body: UI<HTMLTableSectionElement>;

    constructor(){
        super('table');
        this.head = new UI<HTMLTableSectionElement>('thead');
        this.body = new UI<HTMLTableSectionElement>('tbody');
        this.rows = [];
        this.columns = [];
    }

    /** Adds a row to the table */
    addRow(rowData: [string|UI]){
        const row = new UI('tr');

        for(const data of rowData){
            const cell = new TableCell();

            if(typeof data == 'string')
                cell.append(new UI('p').setText(data));
            else 
                cell.append(data);
            row.append(cell);
        }
        this.rows.push(row);

        
    }
}

export class TableCell extends UI {
    constructor(text?:string){
        super('td');
        if(text)
            this.setText(text);
    }
}