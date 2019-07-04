export function GetDuration(duration: number) {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    if (duration > 3600) {
        hours = Math.floor(duration / 3600);
        duration = duration % 3600;
    }
    if (duration > 60) {
        minutes = Math.floor(duration / 60);
        duration = duration % 60;
    }
    seconds = duration;
    if (seconds > 59) {
        seconds = 0;
        minutes += 1;
    }
    if (minutes > 59) {
        minutes = 0;
        hours += 1;
    }
    return `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
}
