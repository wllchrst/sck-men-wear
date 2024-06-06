import {
  addDoc,
  CollectionReference,
  deleteDoc,
  DocumentData,
  DocumentReference,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export default class FirebaseHelper<T> {
  async getAll(
    collection: CollectionReference<DocumentData, DocumentData>
  ): Promise<T[]> {
    try {
      const snapshot = await getDocs(collection);
      return snapshot.docs.map((doc) => doc.data()) as T[];
    } catch (error) {
      console.log(error);
      console.log("error fetching from the collection " + collection);
      return [];
    }
  }

  async getById(
    collection: CollectionReference<DocumentData, DocumentData>,
    id: string
  ): Promise<T | null> {
    try {
      const q = query(collection, where("id", "==", id));
      const snapshot = await getDocs(q);

      if (snapshot.docs.length != 1) return snapshot.docs[0].data() as T;
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getDataRef(
    collection: CollectionReference<DocumentData, DocumentData>,
    id: string
  ): Promise<DocumentReference | null> {
    try {
      const q = query(collection, where("id", "==", id));
      const snapshot = await getDocs(q);

      if (snapshot.docs.length == 1) return snapshot.docs[0].ref;

      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteById(
    collection: CollectionReference<DocumentData, DocumentData>,
    id: string
  ) {
    try {
      const q = query(collection, where("id", "==", id));
      const snapshot = await getDocs(q);

      if (snapshot.docs.length != 1) return false;
      const ref = snapshot.docs[0].ref;
      await deleteDoc(ref);
      return true;
    } catch (error) {
      return false;
    }
  }

  async update(
    id: string,
    updatedData: T,
    collection: CollectionReference<DocumentData, DocumentData>
  ): Promise<boolean> {
    try {
      const ref = await this.getDataRef(collection, id);
      console.log(ref);
      if (ref == null) return false;
      updateDoc(ref, updatedData as any);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async create(
    collection: CollectionReference<DocumentData, DocumentData>,
    data: T
  ): Promise<boolean> {
    try {
      const ref = await addDoc(collection, data as any);
      if (ref == null) return false;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
