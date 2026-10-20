# PATH_TO_DATA <- 'replace with your path'
PATH_TO_DATA<-'~/Library/CloudStorage/Dropbox/@Projects/simplicity equivalents/Replication'
PATH_TO_DATA<-'/Users/domitilleprevost/Documents/Master Eco-psycho/Stage/coding/jatos/study_assets_root/073bfc0a-f209-4ca9-9665-9f66dd9fd4ef/dataAnalysis/replication_official_oprea'
source(file.path(PATH_TO_DATA,"/Code/Installation.r"))

# -------------------------------------
# Assemble Multiple Pricelist Data Sources

# Early Prolific Sample
source(file.path(PATH_TO_DATA,"/Code/Parsers/error1_parser.r"))
source(file.path(PATH_TO_DATA,"/Code/Parsers/error2_parser.r"))
source(file.path(PATH_TO_DATA,"/Code/Parsers/4box_parser.r"))

# Student Sample
source(file.path(PATH_TO_DATA,"/Code/Parsers/student_parser.r"))

mpl<-rbind(A,B,C,E)

mpl$listName2=''
mpl[mpl$listName=="L1_PWG10",]$listName2<-'G10'
mpl[mpl$listName== "L13_PWL50" ,]$listName2<-'L50'
mpl[mpl$listName=="L10_PWL10",]$listName2<-'L10'
mpl[mpl$listName=="L3_PWG50",]$listName2<-'G50'
mpl[mpl$listName=="L15_PWL90",]$listName2<-'L90'
mpl[mpl$listName=="L14_PWL75",]$listName2<-'L75'
mpl[mpl$listName=="L8_LA1",]$listName2<-'A10'
mpl[mpl$listName=="L5_PWG90",]$listName2<-'G90'
mpl[mpl$listName=="L4_PWG75",]$listName2<-'G75'
mpl[mpl$listName=="L9_LA2",]$listName2<-'A15'
mpl[mpl$listName=="L11_PWL25",]$listName2<-'L25'
mpl[mpl$listName=="L2_PWG25",]$listName2<-'G25'
mpl[mpl$listName=="L16_2PWG50",]$listName2<-'r_G50'
mpl[mpl$listName=="L17_2PWL50",]$listName2<-'r_L50'
mpl[mpl$listName=="L15_2PWG50",]$listName2<-'r_G50'
mpl[mpl$listName=="L16_2PWL50",]$listName2<-'r_L50'
mpl[mpl$listName=="L17_ePWL25",]$listName2<-'eL25'
mpl[mpl$listName=="L18_ePWG75",]$listName2<-'eG75'
mpl$listName<-mpl$listName2

mpl<-mpl%>%select(-listName2)

# Remove repeat subjcts
mpl<-mpl%>%filter(ID!='9669958782' & ID!='9475123454')

# Later Prolific Sample
source(file.path(PATH_TO_DATA,"/Code/Parsers/mpl_parser.r"))

length(F$session)
mpl<-rbind(mpl,F)

mpl$pred<-23
mpl[grepl('G25',mpl$listName),]$pred<-19
mpl[grepl('G50',mpl$listName),]$pred<-13
mpl[grepl('G75',mpl$listName),]$pred<-7
mpl[grepl('G90',mpl$listName),]$pred<-3
mpl[grepl('A10',mpl$listName),]$pred<-20.5
mpl[grepl('A15',mpl$listName),]$pred<-18
mpl[grepl('L10',mpl$listName),]$pred<-2
mpl[grepl('L25',mpl$listName),]$pred<-6
mpl[grepl('L50',mpl$listName),]$pred<-12
mpl[grepl('L75',mpl$listName),]$pred<-18
mpl[grepl('L90',mpl$listName),]$pred<-22
mpl[grepl('eG75',mpl$listName),]$pred<-5.5
mpl[grepl('eL25',mpl$listName),]$pred<-4.5

length(mpl$session)

X<-mpl%>%
  mutate(
    frame=ifelse(grepl('r_',listName),ifelse(frame=='average','r_average','r_random'),frame)
    )%>%
  group_by(session,aveFirst,ID,boxes,imistake,pred,listName,frame,errors,CR1,CR2,CR3,sex,major,math,economics,cuM,cuL,precisionL,precisionM,similarity,attnBoxL,attnBoxM,attnPayL,attnPayM,time)%>%
  summarise(row=mean(a_rows))%>%
  mutate(
    type=ifelse(grepl('G',listName),'G',ifelse(grepl('L',listName),'L',ifelse(grepl('A',listName),'A',ifelse(grepl('VCG',listName),'VCG','VCL'))  ))
  )%>%
  ungroup()%>%
  mutate(
    ce=ifelse(grepl('G',listName),rev(0:25)[row+1]+0.5,(0:-25)[row+1]-0.5),
    pred=ifelse(grepl('G',listName),rev(0:25)[floor(pred)+1]+0.5,
      ifelse(grepl('L',listName),(0:-25)[floor(pred)+1]-0.5, 51-2*pred)
      ),
    prob=ifelse(grepl('A',listName),50, as.numeric(str_sub(listName, start= -2))),
    pred=ifelse(grepl('A',listName),0,pred),
    ce=ifelse(grepl('A',listName),ifelse(listName=='A10',(51 - 2*row) ,(51 - 2*row)), ce),
  )%>%
  select(-row)%>%
  group_by(aveFirst,ID,pred,listName)%>%
  pivot_wider(names_from=frame,values_from=c(ce,time))%>%
  rename(random=ce_random,average=ce_average,r_random=ce_r_random,r_average=ce_r_average)%>%
  mutate(
    listName=gsub(".*_","",listName)
    )%>%
  group_by(session,ID,listName)%>%
  mutate(repeated=sum(!is.na(r_average)))%>%
  mutate(
    random=ifelse(is.na(random),0,random),
    average=ifelse(is.na(average),0,average),
    r_random=ifelse(is.na(r_random),0,r_random),
    r_average=ifelse(is.na(r_average),0,r_average),    
  )%>%
  ungroup()%>%
  group_by(session,aveFirst,ID,boxes,imistake,pred,prob,type,listName,errors,CR1,CR2,CR3,sex,major,math,economics,cuM,cuL,precisionL,precisionM,similarity,attnBoxL,attnBoxM,attnPayL,attnPayM,repeated)%>%
  summarise(
    average=sum(average),random=sum(random),r_average=sum(r_average),r_random=sum(r_random),
    time_average=sum(time_average),time_random=sum(time_random),time_r_average=sum(time_r_average),time_r_random=sum(time_r_random)
    )%>%
  ungroup()%>%
  group_by(session,ID)%>%
  mutate(
    noiseL=sum(abs(random[repeated==1]-r_random[repeated==1]))/2,
    noiseM=sum(abs(average[repeated==1]-r_average[repeated==1]))/2,
    noise=(noiseL+noiseM)/2
    )%>%
  ungroup()%>%arrange(session,ID,listName)

X$elicitation<-"MPL"

length(X$session)

# -------------------------------------
# BDM Data Source

source(file.path(PATH_TO_DATA,"/Code/Parsers/bdm_parser.r"))


BDM<-G%>%
  mutate(
    frame=ifelse(grepl('r_',listName),ifelse(frame=='average','r_average','r_random'),frame)
    )%>%
  group_by(session,aveFirst,ID,boxes,imistake,pred,listName,frame,errors,CR1,CR2,CR3,sex,major,math,economics,cuM,cuL,precisionL,precisionM,similarity,attnBoxL,attnBoxM,attnPayL,attnPayM,time)%>%
  summarise(row=mean(a_rows))%>%
  mutate(
    type=ifelse(grepl('G',listName),'G',ifelse(grepl('L',listName),'L',ifelse(grepl('A',listName),'A',ifelse(grepl('VCG',listName),'VCG','VCL'))  ))
  )%>%
  ungroup()%>%
  mutate(
    prob=ifelse(grepl('A',listName),50, as.numeric(str_sub(listName, start= -2))),
    ce=ifelse(grepl('G',listName),row,-row),
    pred=ifelse(grepl('G',listName),25*(prob/100),-25*(prob/100)),
    pred=ifelse(grepl('A',listName),0,pred)
  )%>%
  select(-row)%>%
  group_by(aveFirst,ID,pred,listName)%>%
  pivot_wider(names_from=frame,values_from=c(ce,time))%>%
  rename(random=ce_random,average=ce_average,r_random=ce_r_random,r_average=ce_r_average)%>%
  mutate(
    listName=gsub(".*_","",listName)
    )%>%
  group_by(session,ID,listName)%>%
  mutate(repeated=sum(!is.na(r_average)))%>%
  mutate(
    random=ifelse(is.na(random),0,random),
    average=ifelse(is.na(average),0,average),
    r_random=ifelse(is.na(r_random),0,r_random),
    r_average=ifelse(is.na(r_average),0,r_average),    
  )%>%
  group_by(session,aveFirst,ID,boxes,imistake,pred,prob,type,listName,errors,CR1,CR2,CR3,sex,major,math,economics,cuM,cuL,precisionL,precisionM,similarity,attnBoxL,attnBoxM,attnPayL,attnPayM,repeated)%>%
  summarise(
    average=sum(average),random=sum(random),r_average=sum(r_average),r_random=sum(r_random),
    time_average=sum(time_average),time_random=sum(time_random),time_r_average=sum(time_r_average),time_r_random=sum(time_r_random)
    )%>%
  group_by(session,ID)%>%
  mutate(
    noiseL=sum(abs(random[repeated==1]-r_random[repeated==1]))/2,
    noiseM=sum(abs(average[repeated==1]-r_average[repeated==1]))/2,   
    noise=(noiseL+noiseM)/2
    )%>%
  ungroup()%>%arrange(session,ID,listName)

  BDM$elicitation<-'BDM'


# -------------------------------------
# Combine Data

X<-rbind(X,BDM)

X$multiplier<-1
X[X$listName=='G50' | X$listName=='L50', ]$multiplier<--1
X[X$listName=='G75' | X$listName=='L25', ]$multiplier<- -1
X[X$listName=='G90' | X$listName=='L10', ]$multiplier<- -1
X[grepl('A',X$listName), ]$multiplier<- -1


X<-X%>%ungroup()%>%
    mutate(
    treatment=ifelse(session==0,'student',
                ifelse(session<3,'error',
                    ifelse(session==3,'4box',
                        ifelse(session==4,'main','bdm')
                      )

                  )
              )
  )


# Rename variables
X<-X%>%
  rename(
    mirror=average,
    lottery=random,
    r_mirror=r_average,
    r_lottery=r_random,
    time_mirror=time_average,
    time_lottery=time_random,
    time_r_mirror=time_r_average,
    time_r_lottery=time_r_random,
    taskName=listName,
    mirrorFirst=aveFirst
    )%>%
  select(-errors)%>%
  mutate(
    mirrorFirst=tolower(mirrorFirst),
    mirrorFirst=(mirrorFirst=='true')
    )

write_csv(X,file.path(PATH_TO_DATA,"/Data/DATA.csv"))

