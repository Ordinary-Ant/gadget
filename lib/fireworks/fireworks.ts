// 生成随机颜色
function genRandomColor() {
    const r: number = Math.floor(Math.random() * 256)
    const g: number = Math.floor(Math.random() * 256)
    const b: number = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`
}


export function genFireworks(fire: number = 160, path: number = 30) {
    const canvas: HTMLCanvasElement | any = document.querySelector('canvas')
    const context: CanvasRenderingContext2D = canvas?.getContext('2d')

    // 画布设置
    const width: number = window.innerWidth || 0
    const height: number = window.innerHeight || 0
    canvas.width = width
    canvas.height = height
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)

    // 烟花数量 & 烟花炸开火花数量
    const fire_path_list: Array<any> = []
    const fire_works_list: Array<any> = []
    const pos = { x: canvas.width, y: canvas.height / 2 }

    // 生成烟花
    for (let i = 0; i < path; i++) {
        const path_obj = {
            x: Math.random() * pos.x + 1,
            y: Math.random() * fire * 2 + canvas.height,
            size: Math.random() + 1.5,
            fill: '#fd1',
            vx: Math.random() - 0.5,
            vy: -(Math.random() + 4),
            ax: Math.random() * 0.02 - 0.01,
            far: Math.random() * fire + (pos.y - fire),
            base: {}
        }
        path_obj.base = {
            x: path_obj.x,
            y: path_obj.y,
            vx: path_obj.vx
        }
        fire_path_list.push(path_obj)
    }

    // 计算烟花生前路径和炸开路径
    function calculationPath () {
        for (let i = 0, len = fire_path_list.length; i < len; i++) {
            const path_item = fire_path_list[i]
            if (path_item.y <= path_item.far) {
                const color = genRandomColor()
                for (let j = 0; j < path * 5; j++) {
                    const fire_obj = {
                        x: path_item.x,
                        y: path_item.y,
                        size: Math.random() + 1.5,
                        fill: color,
                        vx: Math.random() * 5 - 2.5,
                        vy: Math.random() * -5 + 1.5,
                        ay: 0.05,
                        alpha: 1,
                        life: Math.round(Math.random() * fire / 2) + fire / 2,
                        base: {}
                    }
                    fire_obj.base = {
                        life: fire_obj.life,
                        size: fire_obj.size
                    }
                    fire_works_list.push(fire_obj)
                }
                path_item.y = path_item.base.y
                path_item.x = path_item.base.x
                path_item.vx = path_item.base.vx
                path_item.ax = Math.random() * 0.02 - 0.01
            }
            path_item.x += path_item.vx
            path_item.y += path_item.vy
            path_item.vx += path_item.ax
        }
        for (let x = fire_works_list.length - 1; x >= 0; x--) {
            const fire_item = fire_works_list[x]
            if (fire_item) {
                fire_item.x += fire_item.vx
                fire_item.y += fire_item.vy
                fire_item.vy += fire_item.ay
                fire_item.alpha = fire_item.life / fire_item.base.life
                fire_item.size = fire_item.alpha * fire_item.base.size
                fire_item.alpha = fire_item.alpha > 0.6 ? 1 : fire_item.alpha
                fire_item.life--
                if (fire_item.life <= 0) {
                    fire_works_list.splice(x, 1)
                }
            }

        }
    }

    // 绘制烟花升起和炸开动画
    function drawAnimation () {
        context.globalCompositeOperation = 'source-over'
        context.globalAlpha = 0.18
        context.fillStyle = 'black'
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.globalCompositeOperation = 'screen'
        context.globalAlpha = 1

        for (let i = 0, len = fire_works_list.length; i < len; i++) {
            const fire_item = fire_works_list[i]
            context.globalAlpha = fire_item.alpha
            context.beginPath()
            context.arc(fire_item.x, fire_item.y, fire_item.size, 0, 2 * Math.PI)
            context.closePath()
            context.fillStyle = fire_item.fill
            context.fill()
        }

        for (let j = 0, len2 = fire_path_list.length; j < len2; j++) {
            const path_item = fire_path_list[j]
            context.beginPath()
            context.arc(path_item.x, path_item.y, path_item.size, 0, 2 * Math.PI)
            context.closePath()
            context.fillStyle = path_item.fill
            context.fill()
        }
    }
    
    (function fn(){
        requestAnimationFrame(fn)
        calculationPath()
        drawAnimation()
    })()
}