export class State {
    public count: number = 0
    public message: string = ''
    public text: LinkedList = new LinkedList()
    public cursor: Node = null
}

export class Node {
    public value: string = null
    public next: Node = null

    public constructor(value: string) {
        this.value = value
    }
}

export class LinkedList {
    public top: Node = null

    public setTop(cur:Node) {
        this.top = cur
    }

    public constructor(lines: string[] = []) {

        if(lines.length == 0) return; // if no lines
        if(!this.top) this.setTop(new Node(lines[0])) // if no top
        
        let cur: Node = this.top

        for(let i:number = 1; i < lines.length; i++) {

            const newNode = new Node(lines[i])
            cur.next = newNode
            cur = cur.next
        }
    }

    public getText(cur:Node = this.top): string {
        if(!cur.next) return cur.value
        return cur.value + " " + this.getText(cur.next)

    }
}