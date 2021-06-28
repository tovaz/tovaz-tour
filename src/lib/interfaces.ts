export interface TourOptions {
  name, skipped?: false, ended?: false
}
  
export interface StepOptions {
  dom,      
  title, 
  content,  
  image?, 
  tour?,
  position?, 
  delay?, 
  isStart?
}