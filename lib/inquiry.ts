import {z} from 'zod';
export const projectTypes=['web-design','web-development','mobile-apps','ui-ux','custom-solutions','other'] as const;
export const inquirySchema=z.object({
 firstName:z.string().trim().min(1,'required').max(80,'tooLong'),lastName:z.string().trim().min(1,'required').max(80,'tooLong'),
 email:z.string().trim().min(1,'required').email('invalidEmail').max(254,'tooLong'),company:z.string().trim().max(150,'tooLong'),
 type:z.enum(projectTypes,{error:'required'}),description:z.string().trim().min(1,'required').max(5000,'tooLong'),
 timeline:z.string().trim().max(150,'tooLong'),website:z.string().max(0,'invalid'),locale:z.enum(['az','en','bs']),id:z.uuid()
});
export type Inquiry=z.infer<typeof inquirySchema>;
export type FieldName='firstName'|'lastName'|'email'|'company'|'type'|'description'|'timeline';
export function validationIssues(error:z.ZodError){return Object.fromEntries(error.issues.map(i=>[i.path[0],i.message]))}
