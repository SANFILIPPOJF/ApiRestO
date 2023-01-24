
/** 
 * Vérification de l'**INCOMPATIBILITE** de l'objet en tant qu'id. 
 * * Renvoie **true** si l'objet rempli une de ces conditions :
 *   * n'est pas convertible en nombre
 *   * n'est pas un entier
 *   * est un booleen
 */
export function faillingId(id: any) {
    return Number.isNaN(Number(id)) || Number(id) % 1 !== 0 || typeof id === typeof Boolean()
}


/** 
 * Vérification de l'**INCOMPATIBILITE** de l'objet en tant que string. 
 * * Renvoie **true** si l'objet rempli une de ces conditions :
 *   * est undefined
 *   * n'est pas de type string
 *   * si la longueur de la chaine est inferieur au minimum souhaité (defaut = 1)
 *   * si la longueur de la chaine est supérieur à l'eventuelle longueur maximum souhaitée
 */
export function faillingString(message: any = undefined, minLength: number=1, maxLength?: number): boolean {
    const test = message === undefined || typeof message != typeof String() || message.length < minLength;
    if (maxLength!==undefined) {
        return test || message.length > maxLength 
    }
    return test
}

/** 
 * Vérification de l'**INCOMPATIBILITE** de l'objet en tant que boolean. 
 * * Renvoie **true** si l'objet rempli une de ces conditions :
 *   * est undefined
 *   * n'est pas de type Boolean
 */
export function faillingBool(done: any = undefined) {
    return done === undefined || typeof done != typeof Boolean()
}

/** 
 * Vérification de l'**INCOMPATIBILITE** de l'objet en tant que prix de menu. 
 * * Renvoie **true** si l'objet rempli une de ces conditions :
 *   * n'est pas convertible en nombre
 *   * n'est pas 0 < id <= 999.99
 *   * est un booleen
 */
export function faillingPrice(id: any = undefined) {
    return Number.isNaN(Number(id)) ||
        Number(id) > 999.99 ||
        Number(id) <= 0 ||
        typeof id === typeof Boolean()
}
