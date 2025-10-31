import UI, { BaseUI } from '../UI'

/**
 * A list component containing some useful methods.
 * @class
 * @memberof core
 */
export class List extends UI<HTMLUListElement|HTMLOListElement> {
    /**
     * 
     * @param isOrdered - Whether or not the list is an ordered list, defaults to false
     */
    constructor(isOrdered: boolean = false){
        super(isOrdered? 'ol' : 'ul');
    }
}

/**
 * A list item component containing some useful methods.
 * @class
 * @memberof core
 */
export class ListItem extends UI<HTMLLIElement> {
    constructor(){
        super('li');
    }
}