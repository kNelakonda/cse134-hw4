/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advWalkBtn');
    element.addEventListener('click', function () {
        advancedWalk();
    });

    

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advancedModifyBtn');
    element.addEventListener('click', function(){
        advancedModify();
    })

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('advancedBtn');
    element.addEventListener('click', function () {
        advancedAdd();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safeRemove');
    element.addEventListener('click', function () {
        safeRemove();
    });

    element = document.getElementById('specRemoveBtn');
    element.addEventListener('click', function (){
        selectorRemove();
    });

    element = document.getElementById('basicClone');
    element.addEventListener('click', function (){
        basicClone();
    });

    element = document.getElementById('advancedClone');
    element.addEventListener('click', function (){
        advancedClone();
    });

}

function walk() {

   let el;


    
    // given code

   el = document.getElementById('p1');
   showNode(el);

   el = el.firstChild;
   showNode(el);

   el = el.nextSibling;
   showNode(el);

   el = el.lastChild;
   showNode(el);

   el = el.parentNode.parentNode.parentNode;
   showNode(el);

   el = el.querySelector('section > *');
   showNode(el);


}

/**
 * QUESTION 1B
 */
function advancedWalk(){
    let rootNode = document.getElementsByTagName('html')[0];
    let domTree = advanceWalkHelper(rootNode);
    document.getElementById('advWalkTxt').value = domTree;

}

function advanceWalkHelper(root) {
    let treeWalk = document.createTreeWalker(root);

    let domTree = "";
    let currNode = treeWalk.currentNode;
    let parentCount = 0;

    while(currNode){
        let indent = "";
        for(let i = 0; i < parentCount; i++){
            indent += "|   ";
        }

        domTree += indent + "|---"+ currNode.nodeName + "\n";
        if(currNode.firstChild){
            parentCount += 1;
            treeWalk.currentNode = currNode.firstChild;
        } else if (currNode.nextSibling) {
            treeWalk.currentNode = currNode.nextSibling;
        } else {
            let parentNode = currNode.parentNode;
            while (parentNode && !parentNode.nextSibling){
                parentCount -= 1;
                parentNode = parent.parentNode;
            }

            if(!parentNode){
                break;
            }

            parentCount -= 1;
            treeWalk.currentNode = parentNode.nextSibling;
        }

        currNode = treeWalk.currentNode;
    }

    return domTree;
}




/**
 * 
 * QUESTION 1A
 */
function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;
    const text = 'Node type: ' + nodeType +'\nNode name: ' + nodeName + '\nNode value: ' + nodeValue ;
    
    let textBox = document.getElementsByTagName('textarea')[0];
    textBox.append(text);
    textBox.append( '\n\n');
    //let text = document.createTextNode('test text');
    //alert(text);
    //alert(`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`);
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

/**
 * For QUESTION 2: modifies h1"
 */
function advancedModify(){
    let h1Element = document.getElementsByTagName('h1')[0];
    h1Element.innerHTML = 'DOM Manipulation is Fun!';



    const darkNum =  Math.floor(Math.random() * 6) + 1;
    let darkStyle = "--darkcolor" + darkNum;
    console.log(darkStyle);
    h1Element.style.color = "var(" + darkStyle + ")";


    let p1Element = document.getElementById('p1');
    p1Element.classList.toggle('shmancy');
}


function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}


/**
 * QUESTION 3
 */
function advancedAdd(){
    const defText = "this is some default text that I have to use";
    let elType, selector, elTxt;
    let field = document.getElementsByTagName('output')[0];
    selector = document.getElementById('elementSelector').value;
    //console.log(selector);
    elType = document.getElementById('elementType').value;
    //console.log(elType);
    elTxt = document.getElementById('textInput').value;
    //console.log(elTxt);

    if(elTxt.length == 0){
        elTxt = defText;
    }

    const currentDate = new Date();
    const totalTxt = elTxt + " " + currentDate.toLocaleString();
    if(selector == "textNode"){
        const text = document.createTextNode(totalTxt);
        let spanEl = document.createElement("span");
        spanEl.appendChild(text);
        field.appendChild(spanEl);
    } else if (selector ==="comment" ){
        const htmlComment = document.createComment(totalTxt);
        field.appendChild(htmlComment);
    } else {
        let newEl = document.createElement(elType);
        newEl.appendChild(document.createTextNode(totalTxt));
        field.appendChild(newEl)
    }
}



function remove() {
    let blah = document.body.lastChild;
    console.log(blah.id == 'controls');
  document.body.removeChild(document.body.lastChild);
  
}
/**
 * QUESTION 4A
 */
function safeRemove(){
    let last = document.body.lastChild;
    if(last){
        if( last.id != 'controls'){
            document.body.removeChild(last);
            last = document.body.lastChild;
        } else {
            if(document.body.lastChild.previousSibling){
                last = document.body.lastChild.previousSibling;
                document.body.removeChild(last);
            }
            
        }
    } 
}

/**
 * QUESTION 4B
 */
function selectorRemove(){
    let select = document.getElementById('fieldRemove').value;
    while(document.querySelector(select) != null){
        document.querySelector(select).remove();
    }
}


/**
 * QUESTION 5A
 */
function basicClone(){
    let section = document.getElementById('p1').cloneNode(true);
    let field = document.getElementsByTagName('output')[0];
    section.removeAttribute('id');
    field.appendChild(section);

}

/**
 * QUESTION 5B
 */
function advancedClone(){
    let card = document.querySelector('#cardTemplate').content.cloneNode(true);
    console.log(card);
    let title = card.querySelector('.heading');
    console.log(title);
    const cardNum = Math.floor(Math.random() * 1000);
    title.textContent="Card" + cardNum;
    console.log(title.text);

    document.getElementById('card-container').appendChild(card);

}


window.addEventListener('DOMContentLoaded', init);