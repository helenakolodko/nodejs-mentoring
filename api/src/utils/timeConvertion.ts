const NS_PER_SEC = 1e9;

export const hrToMiliseconds = (hr: [number, number]) =>{
    return (hr[0] * NS_PER_SEC + hr[1]) / NS_PER_SEC;
};