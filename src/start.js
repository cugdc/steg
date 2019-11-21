import Engine from './Engine'

export const createEngine = () => Engine.create(document.getElementById('game-view'), 500, 500)

export const onPreInit = () => {}

export const start = (eng) => {}
