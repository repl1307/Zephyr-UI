import UI from '../UI'

/**
 * A list component containing some useful methods.
 * @class
 * @memberof core
 */
export class List extends UI {
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
export class ListItem extends UI {
    list: List; /** The list the item is attached to */

    constructor(list: List){
        super('li');
        this.list = list;
    }
}