import {getFirebaseDatabase} from "./FirebaseDb";

const collName:string = process.env.REACT_APP_COLLECTION_NAME || 'customers-db';

export class GetUsers {
    async getUsers() {
        // const now = new Date();
        const snapshot = await getFirebaseDatabase().collection(collName).where('status', '!=', 'Zrušeno').get();
        // console.log ((new Date().getTime()) - now.getTime())
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        snapshot.forEach((doc: { id: any; data: () => any; }) => {
            // console.log(doc.id, '=>', doc.data());
            // console.log(doc.data().timestamp._seconds)
        });
        return snapshot.docs.map((item: {id: any, data: () => any; }) => {
            return {id: item.id,...item.data()};
        })
    }

    async getArchivedUsers() {
        const snapshot = await getFirebaseDatabase().collection(collName).where('status', '==', 'Zrušeno').get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        snapshot.forEach((doc: { id: any; data: () => any; }) => {
            console.log(doc.id, '=>', doc.data());
        });
        return snapshot.docs.map((item: {id: any, data: () => any; }) => {
            return {id: item.id,...item.data()};
        })
    }

    async getUserById(id: string) {
        const snapshot = await getFirebaseDatabase().collection(collName).where('__name__', '==',`${id}`).get()
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        snapshot.forEach((doc: { id: any; data: () => any; }) => {
            console.log(doc.id, '=>', doc.data());
        });
        return snapshot.docs.map((item: {id: any, data: () => any; }) => {
            return {id: item.id,...item.data()};
        })
    }

    async getUsersInfoForInvoicing() {
        const snapshot = await getFirebaseDatabase().collection(collName).where('status', '==', 'Aktivní').get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        // snapshot.forEach((doc: { id: any; data: () => any; }) => {
        //    console.log(doc.id, '=>', doc.data());
        // });
        const snap = snapshot.docs.map((item: {id: any, data: () => any; }) => {
            // return {
            //     email: item.data().email,
            //     varSymbol: item.data().varSymbol,
            //     language: item.data().language
            // };
            return [item.data().email,item.data().varSymbol, item.data().language]
        })
        process.stdout.write(JSON.stringify(snap))
        // [
        // { email: 'szopatrik@gmail.com', varSymbol: 123456789, language: 'en' },
        //     { email: 'szopatrik@gmail.com', varSymbol: '49848165', language: 'en' }
        // ]
        return snap;
    }
}

new GetUsers().getUsersInfoForInvoicing()



