/** sidebar with buttons */
let sidebar: HTMLCanvasElement

/** currently selected drawables */
let selected: graph.drawable[]

/** start X of the mouse movement */
let x = 0
/** start Y of the mouse movement */
let y = 0

document.body.onload = function () {
	//setup display area
	let canvas = document.createElement("canvas")
	canvas.style.display = "block"
	const ctx = canvas.getContext("2d")
	if (ctx == null) {
		return
	}

	//setup sidebar area
	sidebar = document.createElement("canvas")
	sidebar.height = 70
	sidebar.style.display = "block"
	document.body.onresize = function () {
		canvas.width = document.body.clientWidth
		canvas.height = document.body.clientHeight - sidebar.height
		ctx.textAlign = "center"
		ctx.textBaseline = "middle"
		ctx.lineWidth = 3
		ctx.font = graph.fontHeight.toString() + "px monospace"
		drawSidebar()
	}

	//draw display and sidebar
	document.body.onresize(new UIEvent(""))

	document.body.appendChild(canvas)
	document.body.appendChild(sidebar)

	graph.setup(ctx)
	selected = []
}

/** update the sidebar */
function drawSidebar() {
	let sidebarCtx = sidebar.getContext("2d")
	if (sidebarCtx == null) {
		console.log("dfsa")
		return
	}
	sidebar.width = document.body.clientWidth
	sidebarCtx.textAlign = "center"
	sidebarCtx.textBaseline = "middle"
	sidebarCtx.font = "30px monospace"
	sidebarCtx.fillStyle = color.boxNormal
	sidebarCtx.fillRect(0, 0, sidebar.width, sidebar.height)

	let names = ["webcam", "file", "shader", "matrix", "display", "template", "color", "delete", "help"]
	sidebarCtx.fillStyle = color.boxBackground
	let diff = sidebar.width / names.length
	for (let i = 0; i < names.length; i++) {
		sidebarCtx.fillRect(diff * i + 5, 5, diff - 10, sidebar.height - 10)
	}
	sidebarCtx.fillStyle = color.text
	for (let i = 0; i < names.length; i++) {
		sidebarCtx.fillText((i + 1).toString() + ":" + names[i], (i + 0.5) * diff, sidebar.height / 2)
	}
}

/** set selected empty or the drawable */
function resetSelected(x: graph.drawable | null = null) {
	for (let i = 0; i < selected.length; i++) {
		selected[i].selected = false
	}
	if (x != null) {
		x.selected = true
		selected = [x]
	} else {
		selected = []
	}
}

document.body.onkeydown = async function (ev: KeyboardEvent) {
	let x: graph.drawable | null = null
	let key = ev.key.toLowerCase()
	switch (key) {
		case "1":
			x = await graph.addWebcam()
			break
		case "2":
			x = await graph.addFile()
			break
		case "3":
			x = addOperator()
			break
		case "4":
			x = graph.addCustomOperator()
			break
		case "5":
			x = graph.addDisplay()
			break
		case "6":
			addTemplate()
			break
		case "7":
			color.advance()
			drawSidebar()
			break
		case "8":
		case "delete":
			for (let i = 0; i < selected.length; i++) {
				graph.remove(selected[i])
			}
			selected = []
			break
		case "9":
			if (selected.length == 1) {
				alert(selected[0].helptext)
			} else {
				alert(helptext)
			}
			break
		default:
			if (selected.length == 1) {
				selected[0].edit(key)
			}
			break
	}
	if (x != null) {
		resetSelected(x)
	}
}

function getUserNumber(text: string): number {
	let ans = window.prompt(text, "")
	if (ans == null) {
		return 0
	} else {
		let x = parseFloat(ans)
		if (isNaN(x)) {
			return 0
		}
		return x
	}
}


document.body.onmousedown = function (ev: MouseEvent) {
	//mouse in input area
	if (document.body.clientHeight - ev.pageY < sidebar.height) {
		let idx = Math.floor((ev.pageX / document.body.clientWidth) * 9)
		document.body.dispatchEvent(new KeyboardEvent("keydown", { key: (idx + 1).toString() }))
		return
	}

	//select selected
	if (!ev.shiftKey) {
		for (let i = 0; i < selected.length; i++) {
			selected[i].selected = false
		}
		selected = []
	}

	//find drawable at the positon
	let c = graph.findAt(ev.pageX, ev.pageY)
	if (c == null) {
		x = ev.pageX
		y = ev.pageY
		return
	}

	//remove drawable if it is already selected
	for (let i = 0; i < selected.length; i++) {
		if (selected[i] == c) {
			selected.splice(i, 1)
			//selected[i] = selected[selected.length - 1]
			//selected[selected.length - 1] = c
			return
		}
	}
	c.selected = true
	selected.push(c)
}

document.body.onmouseup = function (ev: MouseEvent) {
	if (document.body.clientHeight - ev.pageY < sidebar.height) {
		return
	}
	let dest = graph.findAt(ev.pageX, ev.pageY)
	if (dest == null) {
		if (selected.length == 0) {
			graph.moveAll(ev.pageX - x, ev.pageY - y)
		} else {
			graph.moveTo(selected, ev.pageX, ev.pageY)
		}
		return
	}
	for (let i = 0; i < selected.length; i++) {
		if (dest == selected[i]) {
			return
		}
	}
	for (let i = 0; i < selected.length; i++) {
		dest.addInput(selected[i])
	}
}

document.body.onwheel = function (ev: WheelEvent) {
	for (let i = 0; i < selected.length; i++) {
		selected[i].zoom(ev.deltaY)
	}
}

function addOperator(): graph.drawable | null {
	let text = "Please enter shader name"
	let allShaders = Object.keys(shaders.all)
	for (let i = 0; i < allShaders.length; i++) {
		text += "\n  " + (i + 1).toString() + ": " + allShaders[i]
	}
	var shaderName = window.prompt(text, "")
	if (shaderName == null || shaderName.length == 0) {
		return null
	}
	if ('0' <= shaderName[0] && shaderName[0] <= '9') {
		var x = Number.parseInt(shaderName, 10);
		if (isNaN(x)) {
			alert("not a valid number")
			return null
		}
		if (x < 1 || x > allShaders.length) {
			alert("index out of range")
			return null
		}
		shaderName = allShaders[x - 1];
	}
	return graph.addOperator(shaderName)
}

function addTemplate() {
	let text = "Please enter template name"
	let templates = Object.keys(template.all)
	for (let i = 0; i < templates.length; i++) {
		text += "\n  " + (i + 1).toString() + ": " + templates[i]
	}
	let name = window.prompt(text, "")
	if (name == null || name.length == 0) {
		return
	}
	if ('0' <= name[0] && name[0] <= '9') {
		var x = Number.parseInt(name, 10);
		if (isNaN(x)) {
			alert("not a valid number")
			return null
		}
		if (x < 1 || x > templates.length) {
			alert("index out of range")
			return null
		}
		name = templates[x - 1]
	} else {
		if (name in template.all == false) {
			return
		}
	}
	let data = template.all[name]
	let result: graph.drawable[] = []
	resetSelected()
	for (let i = 0; i < data.length; i++) {
		let x = graph.addOperator(data[i].name)
		if (x == null) {
			return
		}
		result.push(x)
		for (let j = 0; j < data[i].inputs.length; j++) {
			let idx = data[i].inputs[j]
			x.addInput(result[idx])
			x.x = Math.max(x.x, result[idx].x + result[idx].w + 50 + x.w)
		}
		for (let j = 0; j < selected.length; j++) {
			if (Math.abs(selected[j].x - x.x) < x.w) {
				x.y = selected[j].y + selected[j].h + 50 + x.h
			}
		}
		selected.push(x)
		x.selected = true
	}
}


const helptext = `
1: add Webcam input
2: add File input (jpg, png, webm, mp4)
3: add shader operator
4: add matrix operator
5: add display output
6: add complete template
7: change color theme
8: delete selected operator
9: open generic help or for selected operator`
