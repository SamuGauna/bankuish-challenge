import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsValidCourse(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidCourse',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const { desiredCourse, requiredCourse } = args.object as any;
          // Si requiredCourse es nulo, es válido
          if (!requiredCourse) {
            return true;
          }
          // Validar que no sean iguales
          return requiredCourse !== desiredCourse;
        },
        defaultMessage(args: ValidationArguments) {
          return `The required course name is invalid or conflicts with desiredCourse.`;
        },
      },
    });
  };
}
