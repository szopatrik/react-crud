import {getFirebaseDatabase} from "./FirebaseDb";
const FieldValue = require('firebase-admin').firestore.FieldValue;

const collName:string = process.env.REACT_APP_COLLECTION_NAME || 'customers-db';

export class UpdateUser {
    async updateUser(
          docIdToUpdate: string,
          name: string,
          surname: string,
          bornDate: string,
          street: string,
          city: string,
          postCode:string,
          email: string,
          phone: string,
          varSymbol: number,
          language: 'cz'|'en',
          note: string,
          status: 'Aktivní'|'Čeká na aktivaci'|'Pozastaveno'|'Zrušeno',
    ) {
        const res = await  getFirebaseDatabase()
            .collection(collName)
            .doc(docIdToUpdate)
            .update({
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
                lastChange: FieldValue.serverTimestamp()
            })
        console.log('Updated document with ID: ', docIdToUpdate);
    }

    async archiveUser(docIdToUpdate: string) {
        const res = await  getFirebaseDatabase()
            .collection(collName)
            .doc(docIdToUpdate)
            .update({
                status: "Zrušeno"
            })
        console.log('Archived document with ID: ', docIdToUpdate);
    }
}

