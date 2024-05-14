import { MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateBlogDto {
    @MaxLength(30)
    @ApiProperty()
    title:string;

    @MinLength(50)
    @ApiProperty()
    description:string;
}
