import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class deleteOrder {

    @IsNotEmpty()
    @ApiProperty()
    id:string;
}