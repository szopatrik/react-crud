import {getFirebaseDatabase} from "./FirebaseDb";

const collName:string = process.env.REACT_APP_COLLECTION_NAME || 'customers-db';

export class DeleteUser {
    async deleteUser(docIdToDelete: string) {
        const res = await  getFirebaseDatabase()
            .collection(collName)
            .doc(docIdToDelete)
            .delete();
        console.log('Deleted document with ID: ', res.id);
    }
}
