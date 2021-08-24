
import { IsNotEmpty } from 'class-validator';

export class UpdateStatusDto {
    @IsNotEmpty()
    action:string

    reason:string
}