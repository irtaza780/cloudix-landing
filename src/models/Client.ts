import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/database';

export interface ClientAttributes {
  id?: number;
  name: string;
  email: string;
  company: string;
  phone?: string;
  status: 'active' | 'inactive';
  created_at?: Date;
  updated_at?: Date;
}

class Client extends Model<ClientAttributes> implements ClientAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public company!: string;
  public phone?: string;
  public status!: 'active' | 'inactive';
  public created_at!: Date;
  public updated_at!: Date;
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    modelName: 'Client',
    tableName: 'clients',
    timestamps: true,
    underscored: true,
  }
);

export default Client; 