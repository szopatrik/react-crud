import {getFirebaseDatabase} from "./FirebaseDb";
const FieldValue = require('firebase-admin').firestore.FieldValue;
import {firestore} from "firebase-admin";
import WriteResult = firestore.WriteResult;

const collName:string = process.env.REACT_APP_COLLECTION_NAME || 'customers-db';

export class AddUser {
    async addUser(
        name: string,
        surname: string,
        bornDate:string,
        street: string,
        city: string,
        postCode: string,
        email: string,
        phone: string,
        varSymbol: number,
        language: 'cz'|'en',
        note: string,
        status: 'Aktivní'|'Čeká na aktivaci'|'Pozastaveno'|'Zrušeno'
        )
        : Promise<WriteResult> {
        return await getFirebaseDatabase()
            .collection(collName)
            .add({
                name: name,
                surname: surname,
                bornDate: bornDate,
                street: street,
                city: city,
                postCode: postCode,
                email: email,
                phone: phone,
                varSymbol: varSymbol,
                language: language,
                note: note,
                status: status,
                created: FieldValue.serverTimestamp(),
                lastChange: FieldValue.serverTimestamp()
            }).then(
                (res: any) => {
                    console.log('Added new document with ID: ', res.id);
                    console.log(res) //TODO zkontrolovat si co vše přichází v odpovědi a jak poznat že to proběhlo úspěšně
                    return Promise.resolve(res);
                }
            )
    }

    // async importUser(name:string, surname: string, bornDate:string,street:string, city:string, postCode:string, email: string, varSymbol: string, language: string) :Promise<WriteResult> {
    //     return await  getFirebaseDatabase()
    //         .collection('multisport_users_prod')
    //         .add({
    //             name: name,
    //             surname: surname,
    //             bornDate: bornDate,
    //             street: street,
    //             city: city,
    //             postCode: postCode,
    //             email: email,
    //             phone: "",
    //             varSymbol: varSymbol,
    //             language: language,
    //             note: "",
    //             status: "Aktivní",
    //             created: FieldValue.serverTimestamp(),
    //             lastChange: FieldValue.serverTimestamp()
    //         }).then(
    //             (res:any) => {
    //                 console.log('Added new document with ID: ', res.id);
    //                 console.log(res)
    //                 return Promise.resolve(res);
    //             }
    //         )}
}
// async updateNotification(env: string, id: string, note: string):Promise<WriteResult> {
//     const item = await getFirebaseDatabase().collection(this.getEnvCollectionName(env)).where('id', '==', id).get();
//     if(item.size != 1) {
//     throw "Cannot find document";
// }
// const docId = item.docs[0].id
// return getFirebaseDatabase().collection(this.getEnvCollectionName(env)).doc(docId).update({note: note}).then(
//     (val) => {
//         console.log(`U notifikace ID: ${id} byla upravena poznámka: ${note}.`);
//         return Promise.resolve(val);
//     }
// )
// }
// }
