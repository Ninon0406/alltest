// Shared shape only; every fork and consequence is authored explicitly.
export const c=(id,label,outcomeText,effects={},extra={})=>({id,label,outcomeText,effects,timeDays:0,...extra});
export const e=(id,month,title,prose,choices,extra={})=>({id:`v8.${id}`,ageMinMonths:month,ageMaxMonths:month+11,phase:month<48?'early':month<144?'child':month<252?'youth':month<492?'adult':'elder',title,prose,once:true,interrupt:true,priority:2,choices,...extra});
