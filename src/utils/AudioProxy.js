class AudioProxy{
    constructor(src){
        this.audio = typeof window != 'undefined' && new Audio(src)
    }

    audioObjectExists(action){
        if(this.audio){
            return action()
        }
    }

    set loop(boolean){
        this.audioObjectExists(() => this.audio.loop = boolean)
    }

    set currentTime(time){
        this.audioObjectExists(() => {this.audio.currentTime = time})
    }

    play(){
        this.audioObjectExists(() => {this.audio.play()})
    }

    pause(){
        this.audioObjectExists(() => {this.audio.pause()})
    }
}

export default AudioProxy