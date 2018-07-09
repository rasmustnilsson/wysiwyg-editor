export class State {
    public message: string = ''
    public text: LinkedList = null
    public cursor: Node = null
    public linkedList: LinkedList

    constructor() {
        if(!localStorage.message) {
            this.text = new LinkedList()
            return
        }
        const message = JSON.parse(localStorage.message)
        this.message = message.join('\n')
        this.text = new LinkedList(message)
    }

}

export class OutputState {
    public lineCount: number = 0
    public linkedList: LinkedList
}

export class Node {
    public value: any = null
    public next: Node = null
    public previous: Node = null

    public constructor(value: any, top: Node = null) {
        this.value = value
        if(top) {
            this.previous = top
            this.previous.next = this
        }
    }
}

export class LinkedList {
    public top: Node = null
    public cur: Node = null

    public setTop(cur:Node) {
        this.top = cur
    }

    public constructor(lines: any[] = []) {
        if(lines.length == 0) return; // if no lines
        this.setTop(new Node(lines[0]))
        this.cur = this.top
        for(let i:number = 1; i < lines.length; i++) {
            const newNode = new Node(lines[i], this.cur)
            this.cur = newNode
        }
    }

    public addElement(element: any) {
        const newNode: Node = new Node(element, this.cur)
        if(this.cur == null) {
            this.top = newNode
            this.cur = this.top
            return
        }
        this.cur = newNode
    }

    public getTop(): Node {
        return this.top
    }

    public getElement(list:Element[] = [], cur:Node = this.top): Element[] {
        this.addElementToArray(list, 0, cur)
        return list
    }

    private addElementToArray(list:Element[], index:number = 0, cur:Node = this.top):void {
        if(!cur) return
        list[index++] = cur.value
        if(!cur.next) return
        this.addElementToArray(list,index,cur.next)

    }

    public getText(cur:Node = this.top): any {
        if(!cur.next) return cur.value
        return cur.value + " " + this.getText(cur.next)

    }
}