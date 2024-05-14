import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('traveler-crud')
export class TravelerCrud {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    dateOfBirth?: string;
  
    @Column({ nullable: true })
    gender?: string;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column({ nullable: true })
    middleName?: string;
  
    @Column({ nullable: true })
    secondLastName?: string;
  
    @Column({ nullable: true })
    documents_number?: string;
  
    @Column({ nullable: true })
    documents_issuanceDate?: string;
  
    @Column({ nullable: true })
    documents_expiryDate?: string;
  
    @Column({ nullable: true })
    documents_issuanceCountry?: string;
  
    @Column({ nullable: true })
    documents_issuanceLocation?: string;
  
    @Column({ nullable: true })
    documents_nationality?: string;
  
    @Column({ nullable: true })
    documents_birthPlace?: string;
  
    @Column({ nullable: true })
    documents_documentType?: string;
  
    @Column({ nullable: true })
    documents_validityCountry?: string;
  
    @Column({ nullable: true })
    documents_birthCountry?: string;
  
    @Column({ nullable: true })
    documents_holder?: boolean;
  
    @Column({ nullable: true })
    emergencyContact_addresseeName?: string;
  
    @Column({ nullable: true })
    emergencyContact_countryCode?: string;
  
    @Column({ nullable: true })
    emergencyContact_number?: string;
  
    @Column({ nullable: true })
    emergencyContact_text?: string;
  
    @Column({ nullable: true })
    loyaltyProgram_programOwner?: string;
  
    @Column({ nullable: true })
    loyaltyProgram_id?: string;
  
    @Column({ nullable: true })
    discountEligibility_subType?: string;
  
    @Column({ nullable: true })
    discountEligibility_cityName?: string;
  
    @Column({ nullable: true })
    discountEligibility_travelerType?: string;
  
    @Column({ nullable: true })
    discountEligibility_cardNumber?: string;
  
    @Column({ nullable: true })
    discountEligibility_certificateNumber?: string;

    @Column()
    userId:string;
  }
