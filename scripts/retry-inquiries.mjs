import {database} from '../lib/storage.mjs';
import {deliver} from '../lib/delivery.mjs';
if(process.env.CONTACT_FORM_PROVIDER!=='resend'||!process.env.CONTACT_FORM_API_KEY||!process.env.CONTACT_FROM_EMAIL){console.error('Configure the provider before retrying.');process.exitCode=1}
else{const pending=database().prepare("SELECT id FROM inquiries WHERE status IN ('retry','pending') ORDER BY created LIMIT 100").all();for(const row of pending)await deliver(row.id);console.log('Checked '+pending.length+' stored inquiries.')}
