function deepEqual(obj1, obj2) {
    // Vérifie si les objets sont strictement égaux
    if (obj1 === obj2) {
        return true;
    }

    // Vérifie si l'un des objets est null ou n'est pas un objet
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }

    // Gère les tableaux
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
            return false;
        }
        for (let i = 0; i < obj1.length; i++) {
            if (!deepEqual(obj1[i], obj2[i])) {
                return false;
            }
        }
        return true;
    }

    // Si l'un est un tableau et l'autre non, ils ne sont pas égaux
    if (Array.isArray(obj1) || Array.isArray(obj2)) {
        return false;
    }

    // Obtient les clés des deux objets
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Vérifie si le nombre de clés est différent
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Vérifie chaque propriété récursivement
    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

module.exports = { deepEqual }