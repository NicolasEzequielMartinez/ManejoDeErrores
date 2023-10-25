export default class ErrorGenerator {

    // CART: 

    static generateCidErrorInfo(cid) {
        return `La propiedad de ID de carrito no tiene un formato válido, se recibió ${cid}.`;
    }

    static generateCidOrPidErrorInfo(cid, pid) {
        return `La propiedad de ID del carrito o del producto no tiene un formato válido, se recibieron cid: ${cid}, pid: ${pid}.`;
    }

    static generateQuantityErrorInfo(quantity) {
        return `La cantidad proporcionada (${quantity}) no es un número válido o es cero.`;
    }

    static generatePurchaseErrorInfo(purchaseInfo) {
        return `Una o más propiedades en la información de compra están incompletas o no son válidas. Por favor, proporciona información de compra válida. Se recibió ${purchaseInfo}`;
    }

    static generateProductsPurchaseErrorInfo(databaseProductID, cartProductID) {
        return `Uno o más productos tienen un formato inválido. Se recibió ${databaseProductID} como ID en producto en base de datos y ${cartProductID} como ID de producto en carrito.`;
    }

    static generateEmailUserErrorInfo(userEmail) {
        return `La dirección de correo electrónico proporcionada "${userEmail}" no es válida. Por favor, proporciona una dirección de correo electrónico válida.`;
    }

    static generateUpdatedCartFieldsErrorInfo(updateCartFields) {
        return `No se proporcionó ningún cuerpo products[{product}] para actualizar el carrito. Se recibió ${updateCartFields}`
    }

    static generateUpdatesProdInCartErrorInfo(updatedProdInCart) {
        return `No se proporcionó ningún cuerpo para actualizar el producto en carrito. Se recibió ${updatedProdInCart}`
    }

    // PRODUCTS:

    static generateProductDataErrorInfo(productData) {
        return `Una o más propiedades en los datos del producto están faltando o no son válidas.
    Propiedades requeridas:
    * título: Debe ser un texto no vacío, recibido ${productData.title}.
    * descripción: Debe ser un texto no vacío, recibido ${productData.description}.
    * código: Debe ser un texto no vacío, recibido ${productData.code}.
    * precio: Debe ser un número positivo mayor que 0, recibido ${productData.price}.
    * stock: Debe ser un número positivo mayor que 0, recibido ${productData.stock}.
    * categoría: Debe ser un texto no vacío, recibido ${productData.category}.
    * imágenes: Debe ser un arreglo no vacío de URLs de imágenes, recibido ${productData.thumbnails}.
    `;
    }

    static generatePidErrorInfo(pid) {
        return `La propiedad de ID de producto no tiene un formato válido, se recibió ${pid}.`;
    }

    static generateEmptyUpdateFieldsErrorInfo(updatedFields) {
        return `La información del producto es incompleta o incorrecta. Se recibió: ${updatedFields}.`;
    }

    static generateUserErrorInfo(user) {
        return `Una o más propiedades estaban incompletas o no son válidas.

        Propiedades requeridas:
        * first_name: Debe ser una cadena, recibido ${user.first_name}.
        * last_name: Debe ser una cadena, recibido ${user.last_name}.`;
    }

}