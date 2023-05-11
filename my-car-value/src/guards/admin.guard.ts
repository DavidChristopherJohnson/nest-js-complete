import{
    CanActivate,
    ExecutionContext
} from '@nestjs/common'

export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        if(!request.CurrentUser.userId){
            return false;
        }

        return request.CurrentUser.admin;
    }    
}