import * as Shader from './shader.js';
import * as Matrix from './matrix.js';
import * as Template from './template.js';
export let field;
let trash;
let area;
export let inTrash;
export let svg;
let start;
let all;
export async function Setup() {
    svg = document.getElementById("svg");
    field = document.getElementById("field");
    trash = document.getElementById("trash");
    area = trash.parentElement;
    HideTrash();
    all = [];
    start = { x: 0, y: 0 };
    inTrash = false;
    field.draggable = true;
    let started = false;
    field.ondragstart = (ev) => {
        let img = document.createElement("img");
        if (ev.dataTransfer != null) {
            ev.dataTransfer.setDragImage(img, 0, 0);
        }
        start = { x: ev.pageX - field.offsetLeft, y: ev.pageY - field.offsetTop };
        started = true;
    };
    field.ondrag = async (ev) => {
        ev.stopPropagation();
        if (!ev.ctrlKey) {
            if (ev.clientX == 0 && ev.clientY == 0) {
                return;
            }
            if (started) { //first frame uses the div position, skip it
                started = false;
                return;
            }
            let x = ev.pageX - field.offsetLeft;
            let y = ev.pageY - field.offsetTop;
            let dx = x - start.x;
            let dy = y - start.y;
            start = { x: x, y: y };
            for (let i = 0; i < all.length; i++) {
                all[i].moveBy(dx, dy);
            }
        }
    };
    trash.ondragenter = (ev) => {
        inTrash = true;
    };
    trash.ondragleave = (ev) => {
        setTimeout(() => { inTrash = false; }, 1);
    };
    await Shader.Setup();
    await Matrix.Setup();
    await Template.Setup();
}
export function AddBox(box) {
    all.push(box);
    field.append(box.body);
}
export function RemoveBox(box) {
    let idx = all.indexOf(box);
    all.splice(idx, 1);
    field.removeChild(box.body);
}
export function ShowTrash() {
    area.append(trash);
}
export function HideTrash() {
    trash.remove();
}
