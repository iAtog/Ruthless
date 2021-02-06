module.exports = {
    info: (x) => {
        console.log("[INFO] "+x);
    },
    warn: (x) => {
        console.log("[WARN] "+x);
    },
    severe: (x) => {
        console.log("[SEVERE] "+x);
    },
    error: (x) => {
        console.log("[ERROR] "+x);
    }
} 