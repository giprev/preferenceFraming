# PATH_TO_DATA <- 'replace with your path'
PATH_TO_DATA<-'/Users/domitilleprevost/Documents/Master Eco-psycho/Stage/coding/jatos/study_assets_root/073bfc0a-f209-4ca9-9665-9f66dd9fd4ef/dataAnalysis/replication_official_oprea'
source(file.path(PATH_TO_DATA,"/Code/Installation.r"))

# -------------------------------------------------
# -------------------------------------------------
# Importing and Setting up the working datasets
# -------------------------------------------------
# -------------------------------------------------

S<-read_csv(file.path(PATH_TO_DATA,"/Data/DATA.csv"))

# Working dataset that makes transformations to loss averse measures appropriate to analysis
T<-S%>%
  mutate(
    loss=ifelse(taskName=='A10',10,15),
  )%>%
  mutate(
    pred=ifelse(grepl('A',taskName),0,pred),
    lottery=ifelse(grepl('A',taskName),
      ifelse(elicitation=='MPL',
      -(0.5*lottery-0.5*loss),
      lottery-(0.5*5-0.5*loss)
      )
    ,lottery),
    mirror=ifelse(grepl('A',taskName),
      ifelse(elicitation=='MPL',
      -(0.5*mirror-0.5*loss),
      mirror-(0.5*5-0.5*loss)
      )
    ,mirror),
     r_lottery=ifelse(grepl('A',taskName),
      ifelse(elicitation=='MPL',
      -(0.5*r_lottery-0.5*loss),
      r_lottery-(0.5*5-0.5*loss)
      )
    ,r_lottery),
    r_mirror=ifelse(grepl('A',taskName),
      ifelse(elicitation=='MPL',
      -(0.5*r_mirror-0.5*loss),
      r_mirror-(0.5*5-0.5*loss)
      )
    ,r_mirror)   
  )

T%>%group_by(session,elicitation,imistake,boxes,treatment)%>%summarise(n=length(unique(ID)))


# -------------------------------------------------
# -------------------------------------------------
# Functions for Analysis
# -------------------------------------------------
# -------------------------------------------------

mainPlot<-function(F,lab='',ylim=c(-10,10)){

  cex<-1.7
  pt.cex<-0.8
  offset<-1

  x<-F%>%filter(grepl('G',taskName))%>%filter(prob!=50)
  plot(x$prob-0.5,x$lottery-x$pred,type='n',pch=21,bg='blue',col='blue',xlim=c(0,100),ylim=ylim,ylab='Deviation from Expected Value',xlab='Probability',yaxt='n',bty='n',xaxt='n',main=lab)
  axis(1,at=seq(0,100,10),labels=seq(0,1,0.1))
  mtext("Risk/Loss Seeking",at=4,side=4,srt=180); mtext("Risk/Loss Averse",at=-4,side=4,srt=180)

  legend("top",legend=c("Lottery (Certainty Equivalents)",'Mirror (Simplicity Equivalents)'),col=c('black','black'),pt.bg=c('gray','white'),pch=c(21,21),lty=c(1,1),cex=0.9,pt.cex=1.5,bg=NA,box.lwd=NA)

  axis(2,at=seq(-10,10,5))
  abline('h'=0,lty=1)

  arrows(x0=x$prob-0.5, y0=x$lottery-x$pred-2*x$ceLotteryse, x1=x$prob-0.5, y1=x$lottery-x$pred+2*x$ceLotteryse, code=3, angle=90, length=0.05, col="black", lwd=0.5)
  points(x$prob-0.5,x$lottery-x$pred,bg='gray',col='black',pch=21,type='p',cex=cex)
  text(x$prob,x$lottery-x$pred,pos=2,labels=x$taskName,cex=pt.cex,col='black',offset=offset)

  arrows(x0=x$prob+0.5, y0=x$mirror-x$pred-2*x$ceMirrorse, x1=x$prob+0.5, y1=x$mirror-x$pred+2*x$ceMirrorse, code=3, angle=90, length=0.05, col="black", lwd=0.5,lty=1)
  points(x$prob+0.5,x$mirror-x$pred,bg='white',col='black',pch=21,type='p',cex=cex)
  text(x$prob,x$mirror-x$pred,pos=4,labels=x$taskName,cex=pt.cex,col='black',offset=offset)

  x<-F%>%filter(grepl('L',taskName))%>%filter(prob!=50)
  arrows(x0=x$prob-0.5, y0=x$lottery-x$pred-2*x$ceLotteryse, x1=x$prob-0.5, y1=x$lottery-x$pred+2*x$ceLotteryse, code=3, angle=90, length=0.05, col="black", lwd=0.5,lty=1)
  points(x$prob-0.5,x$lottery-x$pred,pch=21,bg='gray',col='black',cex=cex)
  text(x$prob,x$lottery-x$pred,pos=2,labels=x$taskName,cex=pt.cex,col='black',offset=offset)

  arrows(x0=x$prob+0.5, y0=x$mirror-x$pred-2*x$ceMirrorse, x1=x$prob+0.5, y1=x$mirror-x$pred+2*x$ceMirrorse, code=3, angle=90, length=0.05, col="black", lwd=0.5,lty=1)
  points(x$prob+0.5,x$mirror-x$pred,pch=21,bg='white',col='black',cex=cex)
  text(x$prob,x$mirror-x$pred,pos=4,labels=x$taskName,cex=pt.cex,col='black',offset=offset)

  x<-F%>%filter(grepl('A',taskName) | grepl('M',taskName))
  arrows(x0=x$prob-0.5, y0=x$lottery-2*x$ceLotteryse, x1=x$prob-0.5, y1=x$lottery+2*x$ceLotteryse, code=3, angle=90, length=0.05, col="black", lwd=0.5,lty=1)
  points(x$prob-0.5,x$lottery,pch=25,bg='gray',col='black',cex=cex)
  text(x$prob,x$lottery,pos=2,labels=x$taskName,cex=pt.cex,col='black',offset=offset)

  arrows(x0=x$prob+0.5, y0=x$mirror-2*x$ceMirrorse, x1=x$prob+0.5, y1=x$mirror+2*x$ceMirrorse, code=3, angle=90, length=0.05, col="black", lwd=0.5,lty=1)
  points(x$prob+0.5,x$mirror,pch=25,bg='white',col='black',cex=cex)
  # text(x$prob,-x$mirror-x$pred,pos=4,labels=x$taskName,cex=0.5,col='red')
  text(x$prob,x$mirror,pos=4,labels=x$taskName,cex=pt.cex,col='black',offset=offset)

}


prospectPlot<-function(P,L,lab='',llab=c('A10','A15')){
  
  cex<-2

  layout(matrix(1:3,1,3,byrow=FALSE))

  x<-P%>%filter(grepl('G',taskName))
  plot(x$prob-0.005,x$lottery,pch=21,bg='gray',col='black',xlim=c(0,1),ylim=c(0,1),type='p',ylab='C/25 (S/25)',xlab='Probability',main=paste(lab,'Probability Weighting, Gains'),bty='n',cex=cex)
  abline('a'=0,'b'=1,lty=4)
  arrows(x0=x$prob-0.005, y0=x$lottery-2*x$ceLotteryse, x1=x$prob-0.005, y1=x$lottery+2*x$ceLotteryse, code=3, angle=90, length=0.05, col="black", lwd=0.25)
  legend("bottomright",legend=c("Lottery (Certainty Eqv.)",'Mirror (Simplicity Eqv.)'),col=c('black','black'),pt.bg=c('gray','white'),pch=21,lty=c(1,1,1,1),pt.cex=1.5,cex=1,bg=NA,box.lwd=NA)
  arrows(x0=x$prob+0.005, y0=x$mirror-2*x$ceMirrorse, x1=x$prob+0.005, y1=x$mirror+2*x$ceMirrorse, code=3, angle=90, length=0.05, col="black", lwd=0.25)
  points(x$prob+0.005,x$mirror,bg='white',col='black',pch=21,type='p',cex=cex)
  points(x$prob-0.005,x$lottery,pch=21,bg='gray',col='black',cex=cex)

  x<-P%>%filter(grepl('L',taskName))
  plot(x$prob-0.005,x$lottery,pch=21,bg='gray',col='black',xlim=c(0,1),ylim=c(0,1),type='p',ylab='C/-25 (S/-25)',xlab='Probability',main=paste(lab,'Probability Weighting, Losses'),bty='n',cex=cex)
  abline('a'=0,'b'=1,lty=4)
  arrows(x0=x$prob-0.005, y0=x$lottery-2*x$ceLotteryse, x1=x$prob-0.005, y1=x$lottery+2*x$ceLotteryse, code=3, angle=90, length=0.05, col="black", lwd=0.25,lty=1)
  arrows(x0=x$prob+0.005, y0=x$mirror-2*x$ceMirrorse, x1=x$prob+0.005, y1=x$mirror+2*x$ceMirrorse, code=3, angle=90, length=0.05, col="black", lwd=0.25,lty=1)
  points(x$prob+0.005,x$mirror,pch=21,bg='white',col='black',cex=cex)
  points(x$prob-0.005,x$lottery,pch=21,bg='gray',col='black',cex=cex)

  plot(0,0,type='n',main=paste(lab,'Loss Aversion'),xlab='',xaxt='n',ylab=expression(lambda),bty='n',xlim=c(0.5,2.5),ylim=c(0.5,2))
  ar<-data.frame(a=t(L[,1:4]-L[,5:8]),b=t(L[,1:4]+L[,5:8]))
  arrows(x0=c(1,1.1,2,2.1), y0=ar$a, x1=c(1,1.1,2,2.1), y1=ar$b, code=3, angle=90, length=0.05,col=c('black','black','black','black'), lwd=0.25)
  points(c(1,1.1,2,2.1),L[,1:4],col=c('black','black','black','black'),pch=c(21,21,21,21),bg=c('gray','white','gray','white'),cex=cex)
  abline('h'=1,lty=4)

  mtext(llab,at=c(1,2),side=1,cex=0.7)

}


magnitudes<-function(df){

  cex<-2
  pt.cex<-1
  offset<-1

  g<-df%>%
    group_by(taskName,prob)%>%
    summarise(
        diff=mean(mirror-lottery),
        medDiff=median(mirror-lottery),
        n=length(unique(ID)),
        ceDiff=sd(mirror-lottery)/sqrt(n),
        multiplier=mean(multiplier)
      )%>%arrange(diff)%>%
    ungroup()%>%mutate(ord=1:length(diff))

  layout(matrix(1:2,1,2,byrow=FALSE))

  plot(g$diff,xlim=c(1,12),ylim=c(-10,10),type='n',bg=ifelse(g$taskName=='A10' | g$taskName=='A15','white','black'),pch=21,cex=1,xaxt='n',bty='n',xlab='',ylab='Mean Difference Between Mirror and Lottery Choice',main='Differences')
  abline('h'=mean(g$diff),lty=4);abline('h'=0,lty=1,col='gray')
  arrows(x0=g$ord, y0=g$diff-2*g$ceDiff, x1=g$ord, y1=g$diff+2*g$ceDiff, code=3, angle=90, length=0.05, col="black", lwd=0.25,lty=1)
  points(g$diff,xlim=c(0,12),ylim=c(-10,10),bg=ifelse(g$taskName=='A10' | g$taskName=='A15','white','gray'),pch=21,cex=cex,xaxt='n',bty='n',xlab='',ylab='Mean Difference Between Lottery and Mirror Choice')
  text(g$diff,labels=g$taskName,pos=1,cex=1,offset=offset)
  legend("topleft",legend=c("Fourfold & 50/50",'Loss Aversion','Pooled Mean'),col=c('black','black','black'),pt.bg=c('gray','white',NA),pch=c(21,21,NA),lty=c(NA,NA,4),pt.cex=1.5,cex=1,bg=NA,box.lwd=NA)

  h<-df%>%
    filter(!grepl('50',taskName))%>%filter(!grepl('VC',taskName))%>%
    mutate(
      fourfold=!grepl('A',taskName)
      )%>%
    group_by(ID,taskName)%>%
    mutate(
      ave=mean(multiplier*(mirror-pred)),
      rand=mean(multiplier*(lottery-pred))
      )%>%
    ungroup()%>%
    group_by(elicitation,taskName)%>%
    mutate(
      pooled=sum(ave)/sum(rand),
    )%>%    
    summarise(
      pooled=mean(pooled)
    )%>%arrange(pooled)

  plot(h$pooled,xlim=c(0,10),cex=1,ylim=c(0,2),xaxt='n',bty='n',xlab='',ylab='Mean Mirror Error Relative to Lottery Error',pch=21,bg=ifelse(h$taskName=='A10' | h$taskName=='A15','white','black'),main='Ratios')  
  abline('h'=mean(h$pooled),lty=4); abline('h'=1,col='gray')
  points(h$pooled,xlim=c(0,10),cex=cex,ylim=c(0,2),xaxt='n',bty='n',xlab='',ylab='Mean Mirror Error Relative to Lottery Error',pch=21,bg=ifelse(h$taskName=='A10' | h$taskName=='A15','white','gray'),main='Ratios')
  text(h$pooled,labels=h$taskName,pos=1,cex=1,offset=offset)
  
}


makeScatter<-function(s,lab){

  layout(matrix(1:2,1,2,byrow=FALSE))

  x<-s%>%filter(mirrorFirst==FALSE)
  plot(x$mirrorError,x$lotteryError,type='n',col=rgb(0,0,0,0.35),pch=19,xlab='Mirror',ylab='Lottery',xlim=c(0,15),ylim=c(0,15),bty='n',main=paste(lab,'Absolute  Deviations'))
  legend("topleft",legend=c("Lottery First",'Mirror First'),col=c('black','black'),pt.bg=c('gray','white'),pt.cex=1.5,pch=21,cex=1,bg=NA,box.lwd=NA)
  points(x$mirrorError,x$lotteryError,col='black',bg='darkgray',pch=21,xlab='DPL Mean Error',ylab='SPL Mean Error',xlim=c(0,12),ylim=c(0,12),bty='n',main='Absolute Mean Error')
  x<-s%>%filter(mirrorFirst==TRUE)
  # points(x$mirrorError,x$lotteryError,col=rgb(1,0,0,0.35),pch=19,ylab='lottery Error')
  points(x$mirrorError,x$lotteryError,col='black',bg='white',pch=21,ylab='lottery Error')
  abline('a'=0,'b'=1,lty=4)

  x<-s%>%filter(mirrorFirst==FALSE)
  plot(x$wmirrorError,x$wlotteryError,type='n',col=rgb(0,0,0,0.35),pch=19,xlab='Mirror',ylab='Lottery',xlim=c(-10,15),ylim=c(-10,15),bty='n',main=paste(lab,'Normalized  Deviations'),xaxt='n',yaxt='n')
  axis(1,at=seq(-10,16,2))
  axis(2,at=seq(-10,16,2))
  abline('h'=0);abline('v'=0)
  points(x$wmirrorError,x$wlotteryError,col='black',bg='gray',pch=21,xlab='DPL Mean Error',ylab='SPL Mean Error',xlim=c(-10,16),ylim=c(-10,10),bty='n',main='Normalized Mean Error',xaxt='n',yaxt='n')
  x<-s%>%filter(mirrorFirst==TRUE)
  points(x$wmirrorError,x$wlotteryError,col='black',bg='white',pch=21,ylab='lottery Error')
  abline('a'=0,'b'=1,lty=4)

  print(
    data.frame(
    'Normalized'=unlist(cor.test(s$wmirrorError,s$wlotteryError)[c('estimate','p.value')]),
    'Absolute'=unlist(cor.test(s$mirrorError,s$lotteryError)[c('estimate','p.value')]),
    'Mirror_First_Normalized'=unlist(cor.test(s[s$mirrorFirst==TRUE,]$wmirrorError,s[s$mirrorFirst==TRUE,]$wlotteryError)[c('estimate','p.value')]),
    'Lottery_First_Normalized'=unlist(cor.test(s[s$mirrorFirst==FALSE,]$wmirrorError,s[s$mirrorFirst==FALSE,]$wlotteryError)[c('estimate','p.value')]),  
    'Mirror_First_Absolute'=unlist(cor.test(s[s$mirrorFirst==TRUE,]$mirrorError,s[s$mirrorFirst==TRUE,]$lotteryError)[c('estimate','p.value')]),
    'Lottery_First_Absolute'=unlist(cor.test(s[s$mirrorFirst==FALSE,]$mirrorError,s[s$mirrorFirst==FALSE,]$lotteryError)[c('estimate','p.value')])
    )
  )

}

# I added standard errors
main_tests<-function(df){
  print(
    df%>%
      group_by(elicitation,taskName)%>%
      summarise(
        lottery_p=wilcox.test(lottery,pred,paired=TRUE)$p.value,
        lottery_sd = sd(lottery),
        mirror_p=wilcox.test(mirror,pred,paired=TRUE)$p.value,
        mirror_sd = sd(mirror),
        lottery5=wilcox.test(lottery,pred,paired=TRUE)$p.value<0.05,
        mirror5=wilcox.test(mirror,pred,paired=TRUE)$p.value<0.05,
        median_difference=median(lottery-mirror),
        difference_test_p=wilcox.test(lottery,mirror,paired=TRUE)$p.value,
        difference_test_sig=wilcox.test(lottery,mirror,paired=TRUE)$p.value<0.05    
        )
    )
}


decomposition<-function(df){

  # Subject-level decompositions, broken down
  df%>%
    filter(!grepl('50',taskName))%>%filter(!grepl('VC',taskName))%>%
    mutate(
      fourfold=!grepl('A',taskName)
      )%>%
    group_by(ID,fourfold)%>%
    mutate(
      ave=mean(multiplier*(mirror-pred)),
      rand=mean(multiplier*(lottery-pred)),
      ratio=ave/rand
      )%>%
    ungroup()%>%
    group_by(elicitation,fourfold)%>%
    mutate(
      ratio=ifelse(is.infinite(ratio),NA,ratio),
      pooled=sum(ave)/sum(rand),
    )%>%
    mutate(
      ratio=ifelse(ratio<quantile(ratio,0.05,na.rm=TRUE),
        quantile(ratio,0.05,na.rm=TRUE),
        ifelse(ratio>quantile(ratio,0.95,na.rm=TRUE),
          quantile(ratio,0.95,na.rm=TRUE),
          ratio
          )
        )
    )%>%
    summarise(
      pooled=mean(pooled),
      mn=mean(ratio,na.rm=TRUE),
      se=sd(ratio,na.rm=TRUE)/sqrt(length(unique(ID)))
    )

}



# --------------------------------------------------------------------------------------------------
# --------------------------------------------------------------------------------------------------
# Section 2:  Subject counts
# --------------------------------------------------------------------------------------------------
# --------------------------------------------------------------------------------------------------

T%>%
  summarise(n=length(unique(ID)))


T%>%group_by(treatment)%>%
  summarise(n=length(unique(ID)))

# --------------------------------------------------------------------------------------------------
# --------------------------------------------------------------------------------------------------
# Section 3:  Main Results
# --------------------------------------------------------------------------------------------------
# --------------------------------------------------------------------------------------------------

# ----------------------------
# Figure 1
# ----------------------------

F_mpl<-T%>%filter(treatment=='main')%>%
  group_by(prob,taskName)%>%
  summarise(
      medDiff=median(lottery-mirror),
      pred=mean(pred),
      n=length(unique(ID)),
      ceLotteryse=sd(lottery)/sqrt(n),
      ceLotterysd=sd(lottery),
      ceMirrorse=sd(mirror)/sqrt(n),
      ceMirrorsd=sd(mirror),
      lottery=mean(lottery),
      mirror=mean(mirror),      
  )
F_mpl

pdf(file.path(PATH_TO_DATA,"/Figures/Figure1.pdf"), width = 7.41, height = 8.31)
mainPlot(F_mpl,'')
dev.off()

# ----------------------------
# Figure 2
# ----------------------------

P_mpl<-S%>%
filter(treatment=='main')%>%
  mutate(prob=prob/100)%>%
  group_by(prob,taskName)%>%
  summarise(
    scale=ifelse(grepl('G',taskName),25,-25),
    n=length(unique(ID)),
    ceLotteryse=sd(lottery/scale[1])/sqrt(n[1]),
    ceMirrorse=sd(mirror/scale[1])/sqrt(n[1]),    
    lottery=mean(lottery)/scale[1],
    mirror=mean(mirror)/scale[1],
    pred=mean(pred),
    # n=n(),
    )%>%
  summarise_all(mean)

L_mpl<-S%>%filter(treatment=='main')%>%
  filter(grepl('A',taskName))%>%
  summarise(
    rLA10=mean(lottery[grepl('A10',taskName)]/10),
    aLA10=mean(mirror[grepl('A10',taskName)]/10),
    rLA15= mean(lottery[grepl('A15',taskName)]/15),
    aLA15= mean(mirror[grepl('A15',taskName)]/15),
    rLA10_se=sd(lottery[grepl('A10',taskName)]/10)/sqrt(n()/2),
    rLA15_se= sd(lottery[grepl('A15',taskName)]/15)/sqrt(n()/2),
    aLA10_se=sd(mirror[grepl('A10',taskName)]/10)/sqrt(n()/2),
    aLA15_se= sd(mirror[grepl('A15',taskName)]/15)/sqrt(n()/2)
    )

pdf(file.path(PATH_TO_DATA,"/Figures/Figure2.pdf"), width = 10.88, height = 5.04)
prospectPlot(P_mpl,L_mpl)
dev.off()

# ----------------------------
# Statistics/Tests 
# ----------------------------

data.frame(main_tests(S%>%filter(treatment=='main')))


# ----------------------------
# Mixed/Unmixed Lottery Comparisons
# ----------------------------


T%>%filter(prob==50,treatment=='main')%>%
  mutate(mixed=grepl('A',taskName))%>%
  group_by(mixed)%>%
  summarise(
    mirror=mean(mirror-pred),
    lottery=mean(lottery-pred)
    )


# -------------------------------------------------
# -------------------------------------------------
# 3.1 Relative Magnitudes
# -------------------------------------------------
# -------------------------------------------------

# ----------------------------
# Statistics/Tests 
# ----------------------------


data.frame(main_tests(S%>%filter(treatment=='main')))


# ----------------------------
# Decomposition
# ----------------------------


decomposition(T%>%filter(treatment=='main'))


# ----------------------------
# Figure 3
# ----------------------------

pdf(file.path(PATH_TO_DATA,"/Figures/Figure3.pdf"), width = 11.07, height = 6.23)
magnitudes(T%>%filter(treatment=='main'))
dev.off()

# -------------------------------------------------
# -------------------------------------------------
# 3.2 Correlation and Heterogeneity
# -------------------------------------------------
# -------------------------------------------------

# ----------------------------
# Figure 4
# ----------------------------


s_mpl<-T%>%
  filter(boxes==100)%>%filter(elicitation!='BDM',session!=0)%>%filter(session>=4)%>%
  filter(!grepl('50',taskName)) %>%
  group_by(mirrorFirst,ID)%>%
  summarise(
    mirrorError=mean(abs(mirror-pred)),
    lotteryError=mean(abs(lottery-pred)),
    wmirrorError=mean(multiplier*(mirror-pred)),
    wlotteryError=mean(multiplier*(lottery-pred))
  )
pdf(file.path(PATH_TO_DATA,"/Figures/Figure4.pdf"), width = 13.05, height = 7.14)
makeScatter(s_mpl,"")
dev.off()

# ----------------------------
# Analysis of Self-Reported Similarity in Behaviors
# ----------------------------

S%>%
  filter(boxes==100)%>%
  filter(session>=4)%>%
  filter(!grepl('50',taskName))%>%
  mutate(
    similarity=ifelse(similarity=="I followed totally different strategies",1,
      ifelse(similarity=="I followed mostly different strategies.",2,
        ifelse(similarity=="I followed mostly similar strategies.",3,4)
      )
    )
  )%>%
  summarise(
    mean(similarity>2)
    )


# ----------------------------
# Risk and Complexity Sensitivity
# ----------------------------

T%>%
  filter(boxes==100)%>%filter(elicitation!='BDM',session!=0)%>%filter(session>=4)%>%filter(!grepl('50',taskName)) %>%
  group_by(ID)%>%
  summarise(
    wmirrorError=mean(multiplier*(mirror-pred)),
    wlotteryError=mean(multiplier*(lottery-pred)),
    diff=mean(multiplier*(lottery-mirror))
  )%>%
  ungroup()%>%
  mutate(
    n=1:n()
  )%>%
  ungroup()%>%
  mutate(
    thresh=1,
    complexitySensitive=wmirrorError>=thresh,
    riskSensitive=diff>=thresh
  )%>%
  mutate(N=length(thresh))%>%
  group_by(complexitySensitive,riskSensitive)%>%
  summarise(
    frac=length(unique(n))/mean(N),
  )


# --------------------------------------------------------------------------------------------------
# --------------------------------------------------------------------------------------------------
# Online Appendices
# --------------------------------------------------------------------------------------------------
# --------------------------------------------------------------------------------------------------


# -------------------------------------------------
# -------------------------------------------------
# A.1 Within-Subjects Comparison
# -------------------------------------------------
# -------------------------------------------------


# ----------------------------
# Figure 5
# ----------------------------

W<-T%>%filter(boxes==100)%>%filter(session>=4)%>%
  mutate(taskName=ifelse(taskName=='A10', 'M10', ifelse(taskName=='A15','M15',taskName)))%>%
  group_by(elicitation,prob,taskName)%>%
  summarise(
      medDiff=median(lottery-mirror),
      pred=mean(pred),
      n=length(unique(ID))/2,
      ceLotteryse=sd(lottery[mirrorFirst==FALSE])/sqrt(n),
      ceMirrorse=sd(mirror[mirrorFirst==TRUE])/sqrt(n),      
      lottery=mean(lottery[mirrorFirst==FALSE]),
      mirror=mean(mirror[mirrorFirst==TRUE]),  )

pdf(file.path(PATH_TO_DATA,"/Figures/Figure5.pdf"), width = 7.41, height = 8.31)
mainPlot(W%>%filter(elicitation=='MPL'),'Between Subjects',c(-10,10))
dev.off()

# ----------------------------
# Tests
# ----------------------------

T%>%
  filter(!grepl('50',taskName))%>%
  filter(boxes==100)%>%filter(session>=4)%>%
  group_by(elicitation,taskName)%>%
  summarise(
    lottery_p=wilcox.test(lottery[mirrorFirst==FALSE],pred[mirrorFirst==FALSE],paired=TRUE)$p.value,
    mirror_p=wilcox.test(mirror[mirrorFirst==TRUE],pred[mirrorFirst==TRUE],paired=TRUE)$p.value,
    lottery5=wilcox.test(lottery[mirrorFirst==FALSE],pred[mirrorFirst==FALSE],paired=TRUE)$p.value<0.05,
    mirror5=wilcox.test(mirror[mirrorFirst==TRUE],pred[mirrorFirst==TRUE],paired=TRUE)$p.value<0.05,
    difference_test_p=wilcox.test(lottery[mirrorFirst==FALSE],mirror[mirrorFirst==TRUE],paired=FALSE)$p.value,
    difference_test_sig=wilcox.test(lottery[mirrorFirst==FALSE],mirror[mirrorFirst==TRUE],paired=FALSE)$p.value<0.05    
    )


# ----------------------------
# Decomposition
# ----------------------------

T%>%
  filter(boxes==100)%>%filter(session>=4)%>% 
  filter(!grepl('50',taskName))%>%filter(!grepl('VC',taskName))%>%
  filter(session>=4)%>%
  mutate(
    fourfold=!grepl('A',taskName)
    )%>%
  group_by(elicitation,fourfold)%>%
  mutate(
    ave=mean(multiplier[mirrorFirst==TRUE]*(mirror[mirrorFirst==TRUE]-pred[mirrorFirst==TRUE]),na.rm=TRUE),
    rand=mean(multiplier[mirrorFirst==FALSE]*(lottery[mirrorFirst==FALSE]-pred[mirrorFirst==FALSE]),na.rm=TRUE),
    ratio=ave/rand
    )%>%
  summarise(
    mn=mean(ratio,na.rm=TRUE))


# -------------------------------------------------
# -------------------------------------------------
# A.2 Student Sample
# -------------------------------------------------
# -------------------------------------------------


# ----------------------------
# Figure 6
# ----------------------------

student<-T%>%filter(boxes==100,elicitation!='BDM')%>%filter(session==0)%>%
  group_by(prob,taskName)%>%
  summarise(
      medDiff=median(lottery-mirror),
      pred=mean(pred),
      n=length(unique(ID)),
      ceLotteryse=sd(lottery)/sqrt(n),
      ceMirrorse=sd(mirror)/sqrt(n),      
      lottery=mean(lottery),
      mirror=mean(mirror),      
  )

pdf(file.path(PATH_TO_DATA,"/Figures/Figure6.pdf"), width = 7.41, height = 8.31)
mainPlot(student,'Students')
dev.off()
# ----------------------------
# Statistics/Tests 
# ----------------------------

main_tests(S%>%filter(boxes==100,session==0))

# ----------------------------
# Decomposition
# ----------------------------

decomposition(T%>%filter(boxes==100,session==0))


# ----------------------------
# Correlation
# ----------------------------


s_student<-T%>%
  filter(boxes==100)%>%filter(session==0)%>%
  filter(!grepl('50',taskName)) %>%
  group_by(mirrorFirst,ID)%>%
  summarise(
    mirrorError=mean(abs(mirror-pred)),
    lotteryError=mean(abs(lottery-pred)),
    wmirrorError=mean(multiplier*(mirror-pred)),
    wlotteryError=mean(multiplier*(lottery-pred))
  )

makeScatter(s_student,"")

# -------------------------------------------------
# -------------------------------------------------
# A.3 BDM Treatment
# -------------------------------------------------
# -------------------------------------------------


# ----------------------------
# Figure 7
# ----------------------------

F_bdm<-T%>%filter(treatment=='bdm')%>%
  group_by(prob,taskName)%>%
  summarise(
      medDiff=median(lottery-mirror),
      pred=mean(pred),
      n=length(unique(ID)),
      ceLotteryse=sd(lottery)/sqrt(n),
      ceMirrorse=sd(mirror)/sqrt(n),      
      lottery=mean(lottery),
      mirror=mean(mirror),      
  )
pdf(file.path(PATH_TO_DATA,"/Figures/Figure7.pdf"), width = 7.41, height = 8.31)
mainPlot(F_bdm,'BDM')
dev.off()
# ----------------------------
# Figure 8
# ----------------------------

P_bdm<-S%>%filter(boxes==100,elicitation=='BDM')%>%
  filter(session!=0)%>%
  filter(grepl('G',taskName) | grepl('L',taskName))%>%
  mutate(prob=prob/100)%>%
  group_by(prob,taskName)%>%
  summarise(
    scale=ifelse(grepl('G',taskName),25,-25),
    n=length(unique(ID)),
    ceLotteryse=sd(lottery/scale[1])/sqrt(n[1]),
    ceMirrorse=sd(mirror/scale[1])/sqrt(n[1]),    
    lottery=mean(lottery)/scale[1],
    mirror=mean(mirror)/scale[1],
    pred=mean(pred),
    )%>%
  summarise_all(mean)



L_bdm<-S%>%filter(boxes==100,,elicitation=='BDM')%>%
  ungroup()%>%
  filter(grepl('A',taskName))%>%
  summarise(
    rLA10=mean(  (0.5*5 - lottery[grepl('A10',taskName)])/(0.5*10)     ),
    aLA10=mean(   (0.5*5 - mirror[grepl('A10',taskName)])/(0.5*10)    ),
    rLA15=mean(  (0.5*5 - lottery[grepl('A15',taskName)])/(0.5*15)     ),
    aLA15=mean(   (0.5*5 - mirror[grepl('A15',taskName)])/(0.5*15)    ),
    rLA10_se=sd(   (0.5*5 - lottery[grepl('A10',taskName)])/(0.5*10)     )/sqrt(n()/2),
    rLA15_se= sd(   (0.5*5 - lottery[grepl('A15',taskName)])/(0.5*15)   )/sqrt(n()/2),
    aLA10_se=sd(   (0.5*5 - mirror[grepl('A10',taskName)])/(0.5*10)     )/sqrt(n()/2),
    aLA15_se= sd(   (0.5*5 - mirror[grepl('A15',taskName)])/(0.5*15)   )/sqrt(n()/2),    
    )
pdf(file.path(PATH_TO_DATA,"/Figures/Figure8.pdf"), width = 10.94, height = 5.09)
prospectPlot(P_bdm,L_bdm,'',c('M10','M15'))
dev.off()

# ----------------------------
# Figure 9
# ----------------------------

s_bdm<-T%>%
  filter(boxes==100)%>%filter(treatment=='bdm')%>%
  filter(!grepl('50',taskName)) %>%
  group_by(mirrorFirst,ID)%>%
  summarise(
    mirrorError=mean(abs(mirror-pred)),
    lotteryError=mean(abs(lottery-pred)),
    wmirrorError=mean(multiplier*(mirror-pred)),
    wlotteryError=mean(multiplier*(lottery-pred))
  )
pdf(file.path(PATH_TO_DATA,"/Figures/Figure9.pdf"), width = 13.07, height = 7.16)
makeScatter(s_bdm,"")
dev.off()

# ----------------------------
# Decomposition
# ----------------------------

decomposition(T%>%filter(treatment=='bdm'))


# ----------------------------
# Tests
# ----------------------------

data.frame(main_tests(S%>%filter(treatment=='bdm')))


# -------------------------------------------------
# -------------------------------------------------
# A.4 4-Box Treatment
# -------------------------------------------------
# -------------------------------------------------


# ----------------------------
# Figure 10
# ----------------------------


F<-T%>%filter(boxes==100)%>%
  filter(session>=4,elicitation=='MPL')%>%
  group_by(prob,taskName)%>%
  summarise(
      n=n(),
      ceLotteryse=sd(lottery)/sqrt(n),
      ceMirrorse=sd(mirror)/sqrt(n),    
      pred=mean(pred),
      lottery=mean(lottery),
      mirror=mean(mirror),
  )


G<-T%>%filter(boxes==4)%>%
  group_by(prob,taskName)%>%
  summarise(
      n=n(),
      ceLotteryse=sd(lottery)/sqrt(n),
      ceMirrorse=sd(mirror)/sqrt(n),
      pred=mean(pred),
      lottery=mean(lottery),
      mirror=mean(mirror),
  )

cex<-1.5
pt.cex<-0.8
off<-0.75
pdf(file.path(PATH_TO_DATA,"/Figures/Figure10.pdf"), width = 13.52, height = 7.87)
layout(matrix(1:2,1,2,byrow=FALSE))

x<-F%>%filter(grepl('G',taskName))%>%filter(prob!=50)
plot(x$prob-0.5,x$lottery-x$pred,type='n',pch=21,bg='gray',col='black',xlim=c(0,100),ylim=c(-10,10),ylab='Deviation from EvMax',main='Lotteries',xlab='Probability',yaxt='n',bty='n',xaxt='n')
axis(1,at=seq(0,100,10),labels=seq(0,1,0.1))
mtext("Risk/Loss Seeking",at=4,side=4,srt=180); mtext("Risk/Loss Averse",at=-4,side=4,srt=180)


  grayLab<-0.85
  text(75,-4,'Certainty Effect (Gain)',col='gray90',cex=grayLab)
  text(75,4,'Certainty Effect (Loss)',col='gray90',cex=grayLab)
  text(25,4,'Possibility Effect (Gain)',col='gray90',cex=grayLab)
  text(25,-4,'Possibility Effect (Loss)',col='gray90',cex=grayLab)
  text(50,-6,'Loss Aversion',col='gray90',cex=grayLab)

legend("top",legend=c("100 Box",'4 Box'),col=c('black','black'),pt.bg=c('gray','white'),pch=c(21,21),lty=c(1,1),cex=1,pt.cex=1.5,bg=NA,box.lwd=NA)

axis(2,at=seq(-10,10,2.5))
abline('h'=0,lty=1)

x<-F%>%filter(grepl('G',taskName))%>%filter(prob!=50)
arrows(x0=x$prob-off, y0=x$lottery-x$pred-2*x$ceLotteryse, x1=x$prob-off, y1=x$lottery-x$pred+2*x$ceLotteryse, code=3, angle=90, length=0.05, col='black', lwd=0.5)
points(x$prob-off,x$lottery-x$pred,bg='gray',col='black',pch=21,type='p',cex=cex)
text(x$prob,x$lottery-x$pred,pos=2,labels=x$taskName,cex=pt.cex,col='black')

x<-G%>%filter(grepl('G',taskName))%>%filter(prob!=50)
arrows(x0=x$prob+off, y0=x$lottery-x$pred-2*x$ceLotteryse, x1=x$prob+off, y1=x$lottery-x$pred+2*x$ceLotteryse, code=3, angle=90, length=0.05, col='black', lwd=0.5)
points(x$prob+off,x$lottery-x$pred,bg='white',col='black',pch=21,type='p',cex=cex)
text(x$prob,x$lottery-x$pred,pos=4,labels=x$taskName,cex=pt.cex,col='black')

x<-F%>%filter(grepl('L',taskName))%>%filter(prob!=50)
arrows(x0=x$prob-off, y0=x$lottery-x$pred-2*x$ceLotteryse, x1=x$prob-off, y1=x$lottery-x$pred+2*x$ceLotteryse, code=3, angle=90, length=0.05, col='black', lwd=0.5,lty=1)
points(x$prob-off,x$lottery-x$pred,pch=21,bg='gray',col='black',cex=cex)
text(x$prob,x$lottery-x$pred,pos=2,labels=x$taskName,cex=pt.cex,col='black')

x<-G%>%filter(grepl('L',taskName))%>%filter(prob!=50)
arrows(x0=x$prob+off, y0=x$lottery-x$pred-2*x$ceLotteryse, x1=x$prob+off, y1=x$lottery-x$pred+2*x$ceLotteryse, code=3, angle=90, length=0.05, col='black', lwd=0.5,lty=1)
points(x$prob+off,x$lottery-x$pred,pch=21,bg='white',col='black',cex=cex)
text(x$prob,x$lottery-x$pred,pos=4,labels=x$taskName,cex=pt.cex,col='black')

x<-F%>%filter(grepl('A',taskName))
arrows(x0=x$prob-off, y0=x$lottery-2*x$ceLotteryse, x1=x$prob-off, y1=x$lottery+2*x$ceLotteryse, code=3, angle=90, length=0.05, col='black', lwd=0.5,lty=1)
points(x$prob-off,x$lottery,pch=25,bg='gray',col='black',cex=cex)
text(x$prob,x$lottery,pos=2,labels=x$taskName,cex=pt.cex,col='black')

x<-G%>%filter(grepl('A',taskName))
arrows(x0=x$prob+off, y0=x$lottery-2*x$ceLotteryse, x1=x$prob+off, y1=x$lottery+2*x$ceLotteryse, code=3, angle=90, length=0.05, col='black', lwd=0.5,lty=1)
points(x$prob+off,x$lottery,pch=25,bg='white',col='black',cex=cex)
text(x$prob,x$lottery,pos=4,labels=x$taskName,cex=pt.cex,col='black')


x<-F%>%filter(grepl('G',taskName))%>%filter(prob!=50)
plot(x$prob-off,x$mirror-x$pred,type='n',pch=21,bg='gray',col='black',xlim=c(0,100),ylim=c(-10,10),ylab='Deviation from EvMax',main='Mirrors',xlab='Probability',yaxt='n',bty='n',xaxt='n')
axis(1,at=seq(0,100,10),labels=seq(0,1,0.1))
mtext("Risk/Loss Seeking",at=4,side=4,srt=180); mtext("Risk/Loss Averse",at=-4,side=4,srt=180)

  grayLab<-0.85
  text(75,-4,'Certainty Effect (Gain)',col='gray90',cex=grayLab)
  text(75,4,'Certainty Effect (Loss)',col='gray90',cex=grayLab)
  text(25,4,'Possibility Effect (Gain)',col='gray90',cex=grayLab)
  text(25,-4,'Possibility Effect (Loss)',col='gray90',cex=grayLab)
  text(50,-6,'Loss Aversion',col='gray90',cex=grayLab)

legend("top",legend=c("100 Box",'4 Box'),col=c('black','black'),pt.bg=c('gray','white'),pch=c(21,21),lty=c(1,1),cex=1,pt.cex=1.5,bg=NA,box.lwd=NA)


axis(2,at=seq(-10,10,2.5))
abline('h'=0,lty=1)

x<-F%>%filter(grepl('G',taskName))%>%filter(prob!=50)
arrows(x0=x$prob-off, y0=x$mirror-x$pred-2*x$ceLotteryse, x1=x$prob-off, y1=x$mirror-x$pred+2*x$ceLotteryse, code=3, angle=90, length=0.05, col='black', lwd=0.5)
points(x$prob-off,x$mirror-x$pred,bg='gray',col='black',pch=21,type='p',cex=cex)
text(x$prob,x$mirror-x$pred,pos=2,labels=x$taskName,cex=pt.cex,col='black')

x<-G%>%filter(grepl('G',taskName))%>%filter(prob!=50)
arrows(x0=x$prob+off, y0=x$mirror-x$pred-2*x$ceLotteryse, x1=x$prob+off, y1=x$mirror-x$pred+2*x$ceLotteryse, code=3, angle=90, length=0.05, col='black', lwd=0.5)
points(x$prob+off,x$mirror-x$pred,bg='white',col='black',pch=21,type='p',cex=cex)
text(x$prob,x$mirror-x$pred,pos=4,labels=x$taskName,cex=pt.cex,col='black')

x<-F%>%filter(grepl('L',taskName))%>%filter(prob!=50)
arrows(x0=x$prob-off, y0=x$mirror-x$pred-2*x$ceLotteryse, x1=x$prob-off, y1=x$mirror-x$pred+2*x$ceLotteryse, code=3, angle=90, length=0.05, col='black', lwd=0.5,lty=1)
points(x$prob-off,x$mirror-x$pred,pch=21,bg='gray',col='black',cex=cex)
text(x$prob,x$mirror-x$pred,pos=2,labels=x$taskName,cex=pt.cex,col='black')

x<-G%>%filter(grepl('L',taskName))%>%filter(prob!=50)
arrows(x0=x$prob+off, y0=x$mirror-x$pred-2*x$ceLotteryse, x1=x$prob+off, y1=x$mirror-x$pred+2*x$ceLotteryse, code=3, angle=90, length=0.05, col='black', lwd=0.5,lty=1)
points(x$prob+off,x$mirror-x$pred,pch=21,bg='white',col='black',cex=cex)
text(x$prob,x$mirror-x$pred,pos=4,labels=x$taskName,cex=pt.cex,col='black')

x<-F%>%filter(grepl('A',taskName))
arrows(x0=x$prob-off, y0=x$mirror-2*x$ceLotteryse, x1=x$prob-off, y1=x$mirror+2*x$ceLotteryse, code=3, angle=90, length=0.05, col='black', lwd=0.5,lty=1)
points(x$prob-off,x$mirror,pch=25,bg='gray',col='black',cex=cex)
text(x$prob,x$mirror,pos=2,labels=x$taskName,cex=pt.cex,col='black')

x<-G%>%filter(grepl('A',taskName))
arrows(x0=x$prob+off, y0=x$mirror-2*x$ceLotteryse, x1=x$prob+off, y1=x$mirror+2*x$ceLotteryse, code=3, angle=90, length=0.05, col='black', lwd=0.5,lty=1)
points(x$prob+off,x$mirror,pch=25,bg='white',col='black',cex=cex)
text(x$prob,x$mirror,pos=4,labels=x$taskName,cex=pt.cex,col='black')
dev.off()

# ----------------------------
# Statistics/Tests 
# ----------------------------

main_tests(S%>%filter(boxes==4))

hund<-T%>%filter(elicitation!='BDM',session>=4)
four<-T%>%filter(elicitation!='BDM',boxes==4)

# lottery
wilcox.test(hund[hund$taskName=='L25',]$lottery-hund[hund$taskName=='L25',]$pred,
  four[four$taskName=='L25',]$lottery-four[four$taskName=='L25',]$pred)

wilcox.test(hund[hund$taskName=='G25',]$lottery-hund[hund$taskName=='G25',]$pred,
  four[four$taskName=='G25',]$lottery-four[four$taskName=='G25',]$pred)

wilcox.test(hund[hund$taskName=='L75',]$lottery-hund[hund$taskName=='L75',]$pred,
  four[four$taskName=='L75',]$lottery-four[four$taskName=='L75',]$pred)

wilcox.test(hund[hund$taskName=='G75',]$lottery-hund[hund$taskName=='G75',]$pred,
  four[four$taskName=='G75',]$lottery-four[four$taskName=='G75',]$pred)

wilcox.test(hund[hund$taskName=='A10',]$lottery-hund[hund$taskName=='A10',]$pred,
  four[four$taskName=='A10',]$lottery-four[four$taskName=='A10',]$pred)

wilcox.test(hund[hund$taskName=='L25',]$lottery-hund[hund$taskName=='L25',]$pred,
  four[four$taskName=='eL25',]$lottery-four[four$taskName=='eL25',]$pred)

wilcox.test(hund[hund$taskName=='G75',]$lottery-hund[hund$taskName=='G75',]$pred,
  four[four$taskName=='eG75',]$lottery-four[four$taskName=='eG75',]$pred)

# mirror
wilcox.test(hund[hund$taskName=='L25',]$mirror-hund[hund$taskName=='L25',]$pred,
  four[four$taskName=='L25',]$mirror-four[four$taskName=='L25',]$pred)

wilcox.test(hund[hund$taskName=='G25',]$mirror-hund[hund$taskName=='G25',]$pred,
  four[four$taskName=='G25',]$mirror-four[four$taskName=='G25',]$pred)

wilcox.test(hund[hund$taskName=='L75',]$mirror-hund[hund$taskName=='L75',]$pred,
  four[four$taskName=='L75',]$mirror-four[four$taskName=='L75',]$pred)

wilcox.test(hund[hund$taskName=='G75',]$mirror-hund[hund$taskName=='G75',]$pred,
  four[four$taskName=='G75',]$mirror-four[four$taskName=='G75',]$pred)

wilcox.test(hund[hund$taskName=='A10',]$mirror-hund[hund$taskName=='A10',]$pred,
  four[four$taskName=='A10',]$mirror-four[four$taskName=='A10',]$pred)

wilcox.test(hund[hund$taskName=='L25',]$mirror-hund[hund$taskName=='L25',]$pred,
  four[four$taskName=='eL25',]$mirror-four[four$taskName=='eL25',]$pred)

wilcox.test(hund[hund$taskName=='G75',]$mirror-hund[hund$taskName=='G75',]$pred,
  four[four$taskName=='eG75',]$mirror-four[four$taskName=='eG75',]$pred)


# ----------------------------
# Decomposition
# ----------------------------

decomposition(T%>%filter(boxes==4))

# -------------------------------------------------
# -------------------------------------------------
# A.5 Correlates of the Pattern
# -------------------------------------------------
# -------------------------------------------------


s<-T%>%
  filter(boxes==100)%>%
  filter(session>=4)%>%
  filter(elicitation=='MPL')%>%
  filter(!grepl('50',taskName))%>%
  filter(!grepl('VC',taskName))%>%
  group_by(ID)%>%
  summarise(
    mirrorFirst=mirrorFirst[1],
    boxes=boxes[1]==4,
    mirrorError=mean(abs(mirror-pred)),
    lotteryError=mean(abs(lottery-pred)),
    wmirrorError=mean(multiplier*(mirror-pred)),
    wlotteryError=mean(multiplier*(lottery-pred)),
    CU=100-(mean(cuL)+mean(cuM))/2,
    cuL=100-mean(cuL),
    cuM=100-mean(cuM),
    precision=100-(mean(precisionL)+mean(precisionM))/2,
    precisionL=100-mean(precisionL),
    precisionM=100-mean(precisionM), 
    attn=100-(mean(attnBoxL)+mean(attnBoxM) + mean(attnPayL) + mean(attnPayM))/4,
    attnBox=100-(mean(attnBoxL)+mean(attnBoxM))/2,
    attnBoxL=100-mean(attnBoxL),
    attnBoxM=100-mean(attnBoxM),
    attnPay=100-(mean(attnPayL)+mean(attnPayM))/2,
    attnPayL=100-mean(attnPayL),
    attnPayM=100-mean(attnPayM),
    noise=(mean(noiseL)+mean(noiseM))/2,
    noiseL=mean(noiseL),
    noiseM=mean(noiseM),
    time=(mean(time_lottery,na.rm=TRUE)+mean(time_mirror,na.rm=TRUE))/2,
    timeM=mean(time_mirror,na.rm=TRUE),
    timeL=mean(time_lottery,na.rm=TRUE),
    U=(grepl('Two or',math[1]) | grepl('Single',math[1]))*1,
      CR=(grepl('4',CR1[1])+grepl('20',CR2[1])+grepl('7000',CR3[1])),
      stem=(grepl('Science',major[1])  | grepl('Mathematics',major[1]))*1, 
    econ=(grepl('Single',economics[1]) | grepl('Two',economics[1]))*1,  
      female=(sex[1]=='Female'),
    similarity=ifelse(similarity[1]=="I followed totally different strategies",1,
      ifelse(similarity[1]=="I followed mostly different strategies.",2,
        ifelse(similarity[1]=="I followed mostly similar strategies.",3,4)
      )
    )
  )


# ----------------------------
# Tests
# ----------------------------

cor.test(s$attnBoxL,s$attnBoxM)
cor.test(s$attnPayL,s$attnPayM)
cor.test(s$precisionL,s$precisionM)
cor.test(s$cuL,s$cuM)
cor.test(s$timeL,s$timeM)
cor.test(s$noiseL,s$noiseM)


# ----------------------------
# Figure 11
# ----------------------------

l<-s%>%
  mutate(var=wlotteryError)%>%
  summarise(
    noise=cor.test(noise,var)$estimate, 
    time=cor.test(timeL,var)$estimate,
    CR=cor.test(CR,var)$estimate,    
    CU=cor.test(CU,var)$estimate,
    precision=cor.test(precisionL,var)$estimate,
    attn=cor.test(attn,var)$estimate,
    similarity=cor.test(similarity,var)$estimate,                                             
    U=cor.test(U,var)$estimate,  
    stem=cor.test(stem,var)$estimate,                            
    econ=cor.test(econ,var)$estimate, 
    female=cor.test(1*female,var)$estimate,  
  )

m<-s%>%
  mutate(var=wmirrorError)%>%
  summarise(
    noise=cor.test(noise,var)$estimate,  
    time=cor.test(timeM,var)$estimate, 
    CR=cor.test(CR,var)$estimate, 
    CU=cor.test(CU,var)$estimate,
    precision=cor.test(precisionM,var)$estimate,
    attn=cor.test(attn,var)$estimate,
    similarity=cor.test(similarity,var)$estimate,                                           
    U=cor.test(U,var)$estimate,  
    stem=cor.test(stem,var)$estimate,                               
    econ=cor.test(econ,var)$estimate, 
    female=cor.test(1*female,var)$estimate,   
  )



lp<-s%>%
  mutate(var=wlotteryError)%>%
  summarise(
    noise=cor.test(noise,var)$p.value, 
    time=cor.test(timeL,var)$p.value,
    CR=cor.test(CR,var)$p.value,     
    CU=cor.test(CU,var)$p.value,
    precision=cor.test(precisionL,var)$p.value,
    attn=cor.test(attn,var)$p.value, 
    similarity=cor.test(similarity,var)$p.value,                                             
    U=cor.test(U,var)$p.value,  
    stem=cor.test(stem,var)$p.value,                            
    econ=cor.test(econ,var)$p.value, 
    female=cor.test(1*female,var)$p.value,            
  )

mp<-s%>%
  mutate(var=wmirrorError)%>%
  summarise(
    noise=cor.test(noise,var)$p.value,  
    time=cor.test(timeM,var)$p.value, 
    CR=cor.test(CR,var)$p.value, 
    CU=cor.test(CU,var)$p.value,
    precision=cor.test(precisionM,var)$p.value,
    attn=cor.test(attn,var)$p.value,
    similarity=cor.test(similarity,var)$p.value,                                           
    U=cor.test(U,var)$p.value,  
    stem=cor.test(stem,var)$p.value,                               
    econ=cor.test(econ,var)$p.value, 
    female=cor.test(1*female,var)$p.value,                    
  )


data.frame(l=t(l),lp=t(lp<=0.05),m=t(m),mp=t(mp<=0.05))

df<-data.frame(m=t(m[1,]),l=t(l[1,]))
lab=c('noise','time','cog. ref.', 'uncert.','imprecision','inattn','similarity','math','stem','econ','female')
pdf(file.path(PATH_TO_DATA,"/Figures/Figure11.pdf"), width = 7, height = 7)
plot(df$m,df$l,ylim=c(-0.4,0.4),xlim=c(-0.4,0.4),xlab="Mirror Correlations (w/ Normalized Error)",ylab="Lottery Correlations (w/ Normalized Error)",cex=1,pch=21,bg=ifelse(lab%in%c('math','stem','econ'),'white',ifelse(lab%in%c('noise','time','cog. ref.','revisions'),'black','gray')))
text(df$m,df$l,labels=lab,pos=2,cex=0.8)
abline('a'=0,'b'=1,lty=4)
legend("bottomright",legend=c("Behavioral Measures",'Self Report','Education'),col=c('black','black','black'),pt.bg=c('black','gray','white'),pch=c(21,21,21),pt.cex=0.8,cex=0.8,bg=NA,box.lwd=NA)
abline('h'=0,lty=4);abline('v'=0,lty=4)
dev.off()
cor.test(df$l,df$m)


# -------------------------------------------------
# -------------------------------------------------
# A.6 Additional MPL data
# -------------------------------------------------
# -------------------------------------------------


# ----------------------------
# Figure 12
# ----------------------------

F_error<-T%>%filter(treatment=='error')%>%
  group_by(prob,taskName)%>%
  summarise(
      medDiff=median(lottery-mirror),
      pred=mean(pred),
      n=length(unique(ID)),
      ceLotteryse=sd(lottery)/sqrt(n),
      ceMirrorse=sd(mirror)/sqrt(n),      
      lottery=mean(lottery),
      mirror=mean(mirror),      
  )
pdf(file.path(PATH_TO_DATA,"/Figures/Figure12.pdf"), width = 7.41, height = 8.31)
mainPlot(F_error,'')
dev.off()

# ----------------------------
# Figure 13
# ----------------------------

P_error<-S%>%
filter(treatment=='error')%>%
  mutate(prob=prob/100)%>%
  group_by(prob,taskName)%>%
  summarise(
    scale=ifelse(grepl('G',taskName),25,-25),
    n=length(unique(ID)),
    ceLotteryse=sd(lottery/scale[1])/sqrt(n[1]),
    ceMirrorse=sd(mirror/scale[1])/sqrt(n[1]),    
    lottery=mean(lottery)/scale[1],
    mirror=mean(mirror)/scale[1],
    pred=mean(pred),
    )%>%
  summarise_all(mean)

L_error<-S%>%filter(treatment=='error')%>%
  filter(grepl('A',taskName))%>%
  summarise(
    rLA10=mean(lottery[grepl('A10',taskName)]/10),
    aLA10=mean(mirror[grepl('A10',taskName)]/10),
    rLA15= mean(lottery[grepl('A15',taskName)]/15),
    aLA15= mean(mirror[grepl('A15',taskName)]/15),
    rLA10_se=sd(lottery[grepl('A10',taskName)]/10)/sqrt(n()/2),
    rLA15_se= sd(lottery[grepl('A15',taskName)]/15)/sqrt(n()/2),
    aLA10_se=sd(mirror[grepl('A10',taskName)]/10)/sqrt(n()/2),
    aLA15_se= sd(mirror[grepl('A15',taskName)]/15)/sqrt(n()/2)
    )
pdf(file.path(PATH_TO_DATA,"/Figures/Figure13.pdf"), width = 10.94, height = 5.08)
prospectPlot(P_error,L_error)
dev.off()

# ----------------------------
# Figure 14
# ----------------------------

s_error<-T%>%
  filter(boxes==100)%>%filter(treatment=='error')%>%
  filter(!grepl('50',taskName)) %>%
  group_by(mirrorFirst,ID)%>%
  summarise(
    mirrorError=mean(abs(mirror-pred)),
    lotteryError=mean(abs(lottery-pred)),
    wmirrorError=mean(multiplier*(mirror-pred)),
    wlotteryError=mean(multiplier*(lottery-pred))
  )
pdf(file.path(PATH_TO_DATA,"/Figures/Figure14.pdf"), width = 13.11, height = 7.19)
makeScatter(s_error,"")
dev.off()

# ----------------------------
# Decomposition
# ----------------------------

decomposition(T%>%filter(treatment=='error'))


# ----------------------------
# Statistical Tests
# ----------------------------

data.frame(main_tests(S%>%filter(treatment=='error')))


# -------------------------------------------------
# -------------------------------------------------
# A.7 50/50 Unmixed Lotteries
# -------------------------------------------------
# -------------------------------------------------

# ----------------------------
# Figure 15
# ----------------------------

F<-T%>%filter(prob==50)%>%
  filter(!grepl('A',taskName))%>%filter(!grepl('M',taskName))%>%
  filter(session!=1 & session!=2)%>%
  mutate(
      group=ifelse(session==4,1,
              ifelse(session==0,2,
                ifelse(session==5,3,
                    4
                  )
                )

        )
    )%>%
  group_by(group,session,elicitation,boxes,prob,taskName)%>%
  summarise(
      n=n(),
      ceLotteryse=sd(lottery)/sqrt(n),
      ceMirrorse=sd(mirror)/sqrt(n),    
      pred=mean(pred),
      lottery=mean(lottery),
      mirror=mean(mirror),
  )

cex<-1.5
pdf(file.path(PATH_TO_DATA,"/Figures/Figure15.pdf"), width = 7.58, height = 6)
x<-F%>%filter(group==1)
plot(c(1,2)-0.1,x$lottery-x$pred,type='n',pch=21,bg='blue',col='blue',xlim=c(0.5,12),ylim=c(-10,10),ylab='Deviation from Expected Value',xlab='Treatment',yaxt='n',bty='n',xaxt='n',main='')
axis(2,at=seq(-10,10,5))
mtext("Risk Seeking",at=4,side=4,srt=180); mtext("Risk Averse",at=-4,side=4,srt=180)
abline('h'=0)
abline('v'=c(3,6,9,12),col='gray',lty=4)
mtext(c('Main','Student','BDM','4-Box'),at=c(1.5,4.5,7.5,10.5),side=1,srt=180);


x<-F%>%filter(group==1)

dom=c(1,2)
arrows(x0=dom-0.1, y0=x$lottery-x$pred-2*x$ceLotteryse, x1=dom-0.1, y1=x$lottery-x$pred+2*x$ceLotteryse, code=3, angle=90, length=0.05, col="black", lwd=0.5)
points(dom-0.1,x$lottery-x$pred,bg=c('gray'),col='black',pch=21,type='p',cex=cex)
text(dom-0.1,x$lottery-x$pred,pos=2,labels=x$taskName,cex=0.5,col='black')

dom=c(1,2)
arrows(x0=dom+0.1, y0=x$mirror-x$pred-2*x$ceMirrorse, x1=dom+0.1, y1=x$mirror-x$pred+2*x$ceMirrorse, code=3, angle=90, length=0.05, col="black", lwd=0.5)
points(dom+0.1,x$mirror-x$pred,bg=c('white'),col='black',pch=21,type='p',cex=cex)
text(dom+0.1,x$mirror-x$pred,pos=4,labels=x$taskName,cex=0.5,col='black')


x<-F%>%filter(group==2)

dom=c(4,5)
arrows(x0=dom-0.1, y0=x$lottery-x$pred-2*x$ceLotteryse, x1=dom-0.1, y1=x$lottery-x$pred+2*x$ceLotteryse, code=3, angle=90, length=0.05, col="black", lwd=0.5)
points(dom-0.1,x$lottery-x$pred,bg=c('gray'),col='black',pch=21,type='p',cex=cex)
text(dom-0.1,x$lottery-x$pred,pos=2,labels=x$taskName,cex=0.5,col='black')

dom=c(4,5)
arrows(x0=dom+0.1, y0=x$mirror-x$pred-2*x$ceMirrorse, x1=dom+0.1, y1=x$mirror-x$pred+2*x$ceMirrorse, code=3, angle=90, length=0.05, col="black", lwd=0.5)
points(dom+0.1,x$mirror-x$pred,bg=c('white'),col='black',pch=21,type='p',cex=cex)
text(dom+0.1,x$mirror-x$pred,pos=4,labels=x$taskName,cex=0.5,col='black')


x<-F%>%filter(group==3)

dom=c(7,8)
arrows(x0=dom-0.1, y0=x$lottery-x$pred-2*x$ceLotteryse, x1=dom-0.1, y1=x$lottery-x$pred+2*x$ceLotteryse, code=3, angle=90, length=0.05, col="black", lwd=0.5)
points(dom-0.1,x$lottery-x$pred,bg=c('gray'),col='black',pch=21,type='p',cex=cex)
text(dom-0.1,x$lottery-x$pred,pos=2,labels=x$taskName,cex=0.5,col='black')

dom=c(7,8)
arrows(x0=dom+0.1, y0=x$mirror-x$pred-2*x$ceMirrorse, x1=dom+0.1, y1=x$mirror-x$pred+2*x$ceMirrorse, code=3, angle=90, length=0.05, col="black", lwd=0.5)
points(dom+0.1,x$mirror-x$pred,bg=c('white'),col='black',pch=21,type='p',cex=cex)
text(dom+0.1,x$mirror-x$pred,pos=4,labels=x$taskName,cex=0.5,col='black')


x<-F%>%filter(group==4)

dom=c(10,11)
arrows(x0=dom-0.1, y0=x$lottery-x$pred-2*x$ceLotteryse, x1=dom-0.1, y1=x$lottery-x$pred+2*x$ceLotteryse, code=3, angle=90, length=0.05, col="black", lwd=0.5)
points(dom-0.1,x$lottery-x$pred,bg=c('gray'),col='black',pch=21,type='p',cex=cex)
text(dom-0.1,x$lottery-x$pred,pos=2,labels=x$taskName,cex=0.5,col='black')

dom=c(10,11)
arrows(x0=dom+0.1, y0=x$mirror-x$pred-2*x$ceMirrorse, x1=dom+0.1, y1=x$mirror-x$pred+2*x$ceMirrorse, code=3, angle=90, length=0.05, col="black", lwd=0.5)
points(dom+0.1,x$mirror-x$pred,bg=c('white'),col='black',pch=21,type='p',cex=cex)
text(dom+0.1,x$mirror-x$pred,pos=4,labels=x$taskName,cex=0.5,col='black')

legend("top",legend=c("Lottery (Certainty Equivalents)",'Mirror (Simplicity Equivalents)'),col=c('black','black'),pt.bg=c('gray','white'),pt.cex=1.5,pch=c(21,21),lty=c(1,1),cex=0.8,bg=NA,box.lwd=NA)
dev.off()


# -------------------------------------------------
# -------------------------------------------------
# A.8 Additional Tables and Figures
# -------------------------------------------------
# -------------------------------------------------


# ----------------------------
# Figure 16
# ----------------------------

break_down_scatter<-function(s,lab=''){

  x<-s%>%filter(mirrorFirst==FALSE)
  plot(x$wmirrorError,x$wlotteryError,type='n',col=rgb(0,0,0,0.35),pch=19,xlab='Mirror',ylab='Lottery',xlim=c(-10,15),ylim=c(-10,15),bty='n',main=lab,xaxt='n',yaxt='n')
  axis(1,at=seq(-10,16,2))
  axis(2,at=seq(-10,16,2))
  abline('h'=0);abline('v'=0)
  points(x$wmirrorError,x$wlotteryError,col='black',bg='gray',pch=21,xlab='DPL Mean Error',ylab='SPL Mean Error',xlim=c(-10,16),ylim=c(-10,10),bty='n',main='Normalized Mean Error',xaxt='n',yaxt='n')
  x<-s%>%filter(mirrorFirst==TRUE)
  points(x$wmirrorError,x$wlotteryError,col='black',bg='white',pch=21,ylab='lottery Error')
  abline('a'=0,'b'=1,lty=4)


  print(
    data.frame(
    'Normalized'=unlist(cor.test(s$wmirrorError,s$wlotteryError)[c('estimate','p.value')]),
    'Absolute'=unlist(cor.test(s$mirrorError,s$lotteryError)[c('estimate','p.value')]),
    'Mirror_First_Normalized'=unlist(cor.test(s[s$mirrorFirst==TRUE,]$wmirrorError,s[s$mirrorFirst==TRUE,]$wlotteryError)[c('estimate','p.value')]),
    'Lottery_First_Normalized'=unlist(cor.test(s[s$mirrorFirst==FALSE,]$wmirrorError,s[s$mirrorFirst==FALSE,]$wlotteryError)[c('estimate','p.value')]),  
    'Mirror_First_Absolute'=unlist(cor.test(s[s$mirrorFirst==TRUE,]$mirrorError,s[s$mirrorFirst==TRUE,]$lotteryError)[c('estimate','p.value')]),
    'Lottery_First_Absolute'=unlist(cor.test(s[s$mirrorFirst==FALSE,]$mirrorError,s[s$mirrorFirst==FALSE,]$lotteryError)[c('estimate','p.value')])
    )
  )


}


s<-T%>%
  filter(boxes==100)%>%
  filter(!grepl('50',taskName))%>%
  filter(session>=4)%>%
  mutate(
    fourfold=grepl('A',taskName)==FALSE
    )%>%    
  group_by(elicitation,fourfold,mirrorFirst,ID)%>%
  summarise(
    mirrorError=mean(abs(mirror-pred)),
    lotteryError=mean(abs(lottery-pred)),
    wmirrorError=mean(multiplier*(mirror-pred)),
    wlotteryError=mean(multiplier*(lottery-pred))
  )
pdf(file.path(PATH_TO_DATA,"/Figures/Figure16a.pdf"), width = 13.05, height = 7.07)
layout(matrix(1:2,1,2,byrow=FALSE))
break_down_scatter(s%>%filter(elicitation=='MPL',fourfold==TRUE),'MPL, Fourfold')
break_down_scatter(s%>%filter(elicitation=='MPL',fourfold==FALSE),'MPL, Loss Aversion')
dev.off()
pdf(file.path(PATH_TO_DATA,"/Figures/Figure16b.pdf"), width = 13.05, height = 7.07)
layout(matrix(1:2,1,2,byrow=FALSE))
break_down_scatter(s%>%filter(elicitation=='BDM',fourfold==TRUE),'BDM, Fourfold')
break_down_scatter(s%>%filter(elicitation=='BDM',fourfold==FALSE),'BDM, Loss Aversion')
dev.off()
