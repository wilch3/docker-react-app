import { Table, Column, Model } from 'sequelize-typescript';
 
@Table({tableName: "data"})
export default class Contact extends Model<Contact> {
    @Column({field: "id"})
    _id: string;

    @Column
    age: number;

    @Column
    eyeColor: string;

    @Column
    name: string;

    @Column
    gender: "male" | "female";

    @Column
    company: string;

    @Column
    email: string;

    @Column
    phone: string;
 
    @Column
    address: string;

}
