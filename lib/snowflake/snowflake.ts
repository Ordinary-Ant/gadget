export function genSnowflake(num: number = 200, radius:number = 10, animal_x: number = 2, animal_y: number = 2) {
    const canvas: HTMLCanvasElement | any = document.querySelector('canvas')
    const context: CanvasRenderingContext2D = canvas?.getContext('2d')

    // 画布设置
    const width: number = window.innerWidth || 0
    const height: number = window.innerHeight || 0
    canvas.width = width
    canvas.height = height

    // 生成雪花
    const snow_num: number = num
    const snows: Array<any> = []
    for(let i = 0; i < snow_num; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const r = Math.random() * radius + 1
        snows.push({x, y, r})
    }
    // 雪花动画
    const snowAnimal = () => {
        for(let i = 0; i < snow_num; i++) {
            const temp = snows[i]
            temp.x += Math.random() * animal_x + 1
            temp.y += Math.random() * animal_y + 1
            if (temp.x > width) temp.x = 0
            if (temp.y > height) temp.y = 0
        }
    }
    // 绘制雪花
    const draw = () => {
        context.clearRect(0, 0, width, height)
        context.beginPath()
        context.fillStyle = 'rgb(255, 255, 255)'
        context.shadowColor = 'rgb(255, 255, 255)'
        context.shadowBlur = 10

        for(let i = 0; i < snow_num; i++) {
            const temp = snows[i]
            context.moveTo(temp.x, temp.y)
            context.arc(temp.x, temp.y, temp.r, 0, 2 * Math.PI)
        }
        context.fill()
        context.closePath()
        snowAnimal()
    }
    draw()
    window.setInterval(draw, 50)
}