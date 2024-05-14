import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class orderHistory {

    @IsNotEmpty()
    @ApiProperty()
    cutomerId:string;

}