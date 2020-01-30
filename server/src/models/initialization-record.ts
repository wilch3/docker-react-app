import { Table, Column, Model } from 'sequelize-typescript';

@Table({tableName: "initialization"})
export default class InitializationRecord extends Model<InitializationRecord> {
    @Column
    initialized: boolean;
}
