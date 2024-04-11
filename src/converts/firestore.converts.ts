import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions
} from 'firebase/firestore'
import Category from '../types/category.types'
import User from '../types/user.type'

export const categoryConverter = {
  toFirestore(category: Category): DocumentData {
    return { ...category }
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Category {
    const data = snapshot.data(options)

    return {
      id: data.id,
      displayName: data.displayName,
      imageUrl: data.imageUrl,
      name: data.name
    }
  }
}

export const userConverter = {
  toFirestore(user: User): DocumentData {
    return { ...user }
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options)

    return {
      id: data.id,
      lastName: data.lastname,
      email: data.email,
      firstName: data.name,
      provider: data.provider
    }
  }
}
