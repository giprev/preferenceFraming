# PATH_TO_DATA <- 'replace with your path'
PATH_TO_DATA<-'~/Library/CloudStorage/Dropbox/@Projects/simplicity equivalents/Replication'

D<-read_csv(file.path(PATH_TO_DATA,"/Data/raw/student1_raw.csv"))

# Clean
D<-D[-(1:2),] #Remove junk row

S<-data.frame()

for(s in 1:length(unique(D$Perm))){

		x<-D[s,]$dataSet%>% 
		  fromJSON() %>% 
		  map_if(is.data.frame, list) %>% 
		  as_tibble() 

		df<-x
		df$aveFirst<-D[s,]$aveFirst
		df$errors<-D[s,]$errors
		df$finalPay<-D[s,]$pay

		df<-df%>%
			select(-list,-clicks,-clickTimes)

		df$ID<-D[s,]$ID
		# df$Name<-D[s,]$Name
		df$Perm<-D[s,]$Perm

		if(length(S)>0){
			S<-rbind(S,df)
		}else{
			S<-df
		}

}


df1<-S%>%mutate(sex=NA,age=NA,major=NA,math=NA,economics=NA,CU=NA,CR1=NA,CR2=NA,CR3=NA)


# ------------------------------------

D<-read_csv(file.path(PATH_TO_DATA,"/Data/raw/student2_raw.csv"))

# Clean
D<-D[-(1:2),] #Remove junk row

S<-data.frame()

for(s in 1:length(unique(D$Perm))){

		x<-D[s,]$dataSet%>% 
		  fromJSON() %>% 
		  map_if(is.data.frame, list) %>% 
		  as_tibble() 

		df<-x
		df$aveFirst<-D[s,]$aveFirst
		df$errors<-D[s,]$errors
		df$finalPay<-D[s,]$pay

		df<-df%>%
			select(-list,-clicks,-clickTimes)

		df$ID<-D[s,]$ID
		# df$Name<-D[s,]$Name
		df$Perm<-D[s,]$Perm

		if(length(S)>0){
			S<-rbind(S,df)
		}else{
			S<-df
		}

}


df2<-S%>%mutate(sex=NA,age=NA,major=NA,math=NA,economics=NA,CU=NA,CR1=NA,CR2=NA,CR3=NA)


# ------------------------------------

D<-read_csv(file.path(PATH_TO_DATA,"/Data/raw/student3_raw.csv"))

# Clean
D<-D[-(1:2),] #Remove junk row

S<-data.frame()

for(s in 1:length(unique(D$Perm))){

		x<-D[s,]$dataSet%>% 
		  fromJSON() %>% 
		  map_if(is.data.frame, list) %>% 
		  as_tibble() 

		df<-x
		df$aveFirst<-D[s,]$aveFirst
		df$errors<-D[s,]$errors
		df$finalPay<-D[s,]$pay

		df<-df%>%
			select(-list,-clicks,-clickTimes)

		df$ID<-D[s,]$ID
		# df$Name<-D[s,]$Name
		df$Perm<-D[s,]$Perm

		df$sex<-D[s,]$sex
		df$age<-D[s,]$age
		df$major<-D[s,]$major
		df$math<-D[s,]$math
		df$economics<-D[s,]$economics

		df$CU<-D[s,]$CU_1
		df$CR1<-D[s,]$Q43
		df$CR2<-D[s,]$Q44
		df$CR3<-D[s,]$Q45


		if(length(S)>0){
			S<-rbind(S,df)
		}else{
			S<-df
		}

}


df3<-S

# ------------------------------------

D<-read_csv(file.path(PATH_TO_DATA,"/Data/raw/student4_raw.csv"))

# Clean
D<-D[-(1:2),] #Remove junk row

S<-data.frame()

for(s in 1:length(unique(D$Perm))){

		x<-D[s,]$dataSet%>% 
		  fromJSON() %>% 
		  map_if(is.data.frame, list) %>% 
		  as_tibble() 

		df<-x
		df$aveFirst<-D[s,]$aveFirst
		df$errors<-D[s,]$errors
		df$finalPay<-D[s,]$pay

		df<-df%>%
			select(-list,-clicks,-clickTimes)

		df$ID<-D[s,]$ID
		# df$Name<-D[s,]$Name
		df$Perm<-D[s,]$Perm

		df$sex<-D[s,]$sex
		df$age<-D[s,]$age
		df$major<-D[s,]$major
		df$math<-D[s,]$math
		df$economics<-D[s,]$economics

		df$CU<-D[s,]$CU_1
		df$CR1<-D[s,]$Q43
		df$CR2<-D[s,]$Q44
		df$CR3<-D[s,]$Q45		

		if(length(S)>0){
			S<-rbind(S,df)
		}else{
			S<-df
		}

}


df4<-S

# ------------------------------------

D<-read_csv(file.path(PATH_TO_DATA,"/Data/raw/student5_raw.csv"))

# Clean
D<-D[-(1:2),] #Remove junk row

S<-data.frame()

for(s in 1:length(unique(D$Perm))){

		x<-D[s,]$dataSet%>% 
		  fromJSON() %>% 
		  map_if(is.data.frame, list) %>% 
		  as_tibble() 

		df<-x
		df$aveFirst<-D[s,]$aveFirst
		df$errors<-D[s,]$errors
		df$finalPay<-D[s,]$pay

		df<-df%>%
			select(-list,-clicks,-clickTimes)

		df$ID<-D[s,]$ID
		# df$Name<-D[s,]$Name
		df$Perm<-D[s,]$Perm

		df$sex<-D[s,]$sex
		df$age<-D[s,]$age
		df$major<-D[s,]$major
		df$math<-D[s,]$math
		df$economics<-D[s,]$economics

		df$CU<-D[s,]$CU_1
		df$CR1<-D[s,]$Q43
		df$CR2<-D[s,]$Q44
		df$CR3<-D[s,]$Q45


		if(length(S)>0){
			S<-rbind(S,df)
		}else{
			S<-df
		}

}


df5<-S


# ------------------------------------

df<-rbind(df1,df2,df3,df4,df5)
df$finalPay<-as.numeric(df$finalPay)

df$pred<-23
df[df$listName=='L2_PWG25',]$pred<-19
df[df$listName=='L3_PWG50',]$pred<-13
df[df$listName=='L4_PWG75',]$pred<-7
df[df$listName=='L5_PWG90',]$pred<-3
df[df$listName=='L6_VCG25',]$pred<-7.5
df[df$listName=='L7_VCG37',]$pred<-5
df[df$listName=='L8_LA',]$pred<-20.5
df[df$listName=='L9_LA',]$pred<-18
df[df$listName=='L10_PWL10',]$pred<-2
df[df$listName=='L11_PWL25',]$pred<-6
df[df$listName=='L13_PWL50',]$pred<-12
df[df$listName=='L14_PWL75',]$pred<-18
df[df$listName=='L15_PWL90',]$pred<-22
df[df$listName=='L16_VCL25',]$pred<-16.5
df[df$listName=='L17_VCL37',]$pred<-19
df[df$listName=='L8_LA',]$listName<-'L8_LA1'
df[df$listName=='L9_LA',]$listName<-'L9_LA2'

E<-df
E$session<-0;E$boxes<-100; E$hasnoise<-FALSE;prolific=FALSE;
E<-E%>%filter(!grepl('VC',listName))%>%mutate(ID=Perm, cuM=NA,cuL=NA,precisionL=NA,precisionM=NA,similarity=NA,attnBoxL=NA,attnBoxM=NA,attnPayL=NA,attnPayM=NA,noiseM=NA,noiseL=NA,noise=NA,clickCount=NA,strategy=NA,comments=NA,imistake=TRUE)
E<-E%>%select(task,listName,frame,clickCount,a_rows,time,pay,selectedRow,ID, aveFirst,errors,finalPay,cuM,cuL,precisionL,precisionM,similarity,attnBoxL,attnBoxM,attnPayL,attnPayM,CR1,CR2,CR3,strategy,age,sex,major,math,economics,comments,pred,boxes,hasnoise,session,imistake)



# write.table(S,file.path(PATH_TO_DATA,"/Data/parsed/student_parsed.csv"),sep=",",row.names=FALSE)

# test against old student_parsed data
