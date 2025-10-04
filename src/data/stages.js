import { 
  i_i,
  i_we,
  i_you,
  you_i,
  you_you,
  you_we,
  we_i,
  we_you,
  we_we 
} from "./../Videos"

export const stages = {
    "i":{
      "i":{
        left:{
          showVideo:true,
          colorMode:"black",
          videoSrc: i_you
        },
        center:{
          showVideo:false,
          colorMode:"black"
        },
        right:{
          showVideo:true,
          colorMode:"black",
          videoSrc: we_i
        },
         sound: '/audio/i-i.mp3',
         soundLoop: true,
        subjectDescription:"THE SUBJECT IS A VICTIM OF THE OBJECT- IFICATION I DO TO MYSELF.",
        objectDescription:"THE READER IS AN OBJECT IN A MOVIE OF THEMSELF GETTING SHOT.",
        poem: [
          "{I} am a monster.",
          "[I] said it. Now shoot",
          "{me}. {My} mouth opens",
          "",
          "and the teeth in {my} head",
          "show and shine— waiting",
          "forever",
          "",
          "yelling of [my] dark pride. Forever",
          "yelling down {my} street, {my}",
          "middle, [my] mistakes, [my] unremarkable",
          "",
          "love of this",
          "tired human that {I} am.",
        ]
      },
      "you":{
        left:{
          showVideo:true,
          colorMode:"black",
          videoSrc: we_we
        },
        center:{
          showVideo:true,
          colorMode:"black",
          videoSrc: i_we
        },
        right:{
          showVideo:false,
          colorMode:"black"
        },
        sound: '/audio/i-you.mp3',
        soundLoop: true,
        subjectDescription:"THE SUBJECT IS THE AUTHOR OBJECTING TO THE OBJECT YOU PUT ME IN.",
        objectDescription:"THE READER IS AN OBJECT YOU VICTIMIZED AND THAT'S HOW YOU GOT SHOT.",
        poem: [
          "{I} am the monster",
          "the moment [you] say",
          "{I} am. Shoot {me}",
          "",
          "in {my} open mouth",
          "as soon as the dark",
          "in [your] head shows its teeth",
          "{I} will wait for [you]",
          "forever. Yelling proud",
          "in the middle of the street",
          "",
          "so tired and in love. Begging",
          "for a mistake unremarkable",
          "and human at last."
        ]
      },
      "them":{
        left:{
          showVideo:true,
          colorMode:"black",
          videoSrc: you_i
        },
        center:{
          showVideo:false,
          colorMode:"black",
          videoSrc: we_you
        },
        right:{
          showVideo:true,
          colorMode:"black",
          videoSrc: we_you
        },
                sound: '/audio/i-they.mp3',
                soundLoop: true,
  subjectDescription:"THE SUBJECT IS THE VICTIM THAT IS FRAMED BY THE OBJECTS.",
  objectDescription:"THE READER IS NOT THEM. THEY ARE OBJECTS THAT LIVE NEAR ME. I AM THE ONE WHO WAS SHOT.",
  poem: [
          "{I} am the monster",
          "the moment",
          "[they] say {I} am.",
          "",
          "[They'll] shoot {me}",
          "in {my} teeth until",
          "{my} mouth goes dark.",
          "",
          "{I} won't wait when",
          "[they] yell pride down",
          "the middle of {my} street.",
          "",
          "{I} am tired of [their] love",
          "of [their] unremarkable",
          "humanity, {I} am tired",
          "",
          "of the mistake",
          "of letting [them] last."
        ]
      },
    },
    "you":{
      "i":{
        left:{
          showVideo:true,
          colorMode:"black",
          videoSrc: i_we
        },
        center:{
          showVideo:false,
          colorMode:"black"
        },
        right:{
          showVideo:true,
          colorMode:"black",
          videoSrc: you_i
        },
                sound: '/audio/you-i.mp3',
                soundLoop: true,
  subjectDescription:"THE SUBJECT IS ME SHOOTING AN OBJECT THAT LOOKS LIKE YOU.",
  objectDescription:"THE READER LOOKS AT THEMSELF GETTING SHOT. THINKING THEY ARE A VICTIM BUT NEVER OBJECTING.",
  poem: [
          "{You} are the monster",
          "the moment [I] saw it:",
          "{Your} wide mouth opening",
          "",
          "shooting darkness. [I] show {you}",
          "[my] teeth when {your} pride",
          "yells.",
          "",
          "In the middle of the street",
          "while waiting, [I] made the mistake",
          "of letting {you} be, and of being",
          "",
          "unremarkable to {you}. That was",
          "the last time [I] ever loved",
          "a human.",
        ]
      },
      "you":{
        left:{
          showVideo:true,
          colorMode:"black",
          videoSrc: you_you
        },
        center:{
          showVideo:true,
          colorMode:"black",
          videoSrc: i_you
        },
        right:{
          showVideo:false,
          colorMode:"black"
        },
                sound: '/audio/you-you.mp3',
                soundLoop: true,
  subjectDescription:"THE SUBJECT OF BEING A VICTIM IS OBJECTIVE TO YOU.",
  objectDescription:"THE READER IS THE OBJECT SHOOTING AND THE SHOOTING OBJECT IS A VERSION OF YOURSELF.",
  poem: [
          "{You} became a monster",
          "the moment {you} became",
          "[yourself]. While shooting",
          "",
          "the dark in {your} head, [your]",
          "teeth opened and yelled",
          "proudly.",
          "",
          "{You} waited for a human",
          "to mistake [you] for love",
          "while sitting alone",
          "",
          "on a dark street",
          "and took one last",
          "unremarkable shot.",
        ]
      },
      "them":{
        left:{
          showVideo:true,
          colorMode:"black",
          videoSrc: you_we
        },
        center:{
          showVideo:false,
          colorMode:"black"
        },
        right:{
          showVideo:true,
          colorMode:"black",
          videoSrc: you_we
        },
                sound: '/audio/you-they.mp3',
                soundLoop: true,
  subjectDescription:"THE SUBJECT IS YOU, OPENING YOUR MOUTH WHILE THEY OBJECT.",
  objectDescription:"THE READER IS AN OBJECT THEY WATCH AT A DISTANCE, SHAKING THEIR HEADS AS YOU GET SHOT.",
  poem: [
          "{You} are a monster",
          "the moment",
          "[they] say {you} are.",
          "",
          "{Your} teeth shattered before",
          "{your} mouth opened.",
          "The dark in [their] heads",
          "",
          "waits forever. Pride",
          "is a yelling street— tired",
          "of {your} mistakes.",
          "",
          "The last human",
          "got shot by mistake, so",
          "",
          "[they] found {you} and",
          "{your} love was too",
          "unremarkable to last.",
        ]
      },
    },
    "them":{
      "i":{
        left:{
          showVideo:true,
          colorMode:"black",
          videoSrc: we_i
        },
        center:{
          showVideo:false,
          colorMode:"black"
        },
        right:{
          showVideo:true,
          colorMode:"black",
          videoSrc: you_i
        },
                sound: '/audio/they-i.mp3',
                soundLoop: true,
  subjectDescription:"THE SUBJECTS ARE AUTHORS THAT THINK THEY ARE VICTIMS.",
  objectDescription:"THE READER IS THE VICTIM THEY STALK UNTIL THE DAY YOU PICK UP AN OBJECT AND SHOOT.",
  poem: [
          "{They} are monsters.",
          "The moment [I] say",
          "shoot, the dark forever",
          "",
          "in {their} heads shows",
          "and waits",
          "and yells at [me] proudly",
          "",
          "and spreads down",
          "[my] street's middle and",
          "mistakes {their} reasonableness",
          "",
          "for love and {their} lack",
          "for humanity 'til at last!",
          "at last [I] arrive!"
        ]
      },
      "you":{
        left:{
          showVideo:false,
          colorMode:"black",
          videoSrc: we_you
        },
        center:{
          showVideo:true,
          colorMode:"black",
          videoSrc: we_you
        },
        right:{
          showVideo:false,
          colorMode:"black"
        },
                sound: '/audio/they-you.mp3',
                soundLoop: true,
  subjectDescription:"THE SUBJECTS ARE THE VICTIMS THAT GOT SHOT WHEN YOU TURNED OFF YOUR MOVIE.",
  objectDescription:"THE READER OBJECTS TO THE VICTIMISATION THEY ARE HOLDING ONTO. IT IS NOT YOUR FAULT THEY SHOT THEMSELVES.",
  poem: [
          "{They} are the monsters",
          "the moment [you] said",
          "{they} were.",
          "",
          "{They're} open",
          "mouths teething in",
          "the dark. {Their} teeth",
          "inside [your] head.",
          "",
          "Waiting forever and",
          "yelling of [your] mistake:",
          "unremarkable human.",
          "",
          "Yelling for a love",
          "that lasts longer",
          "then [you].",
        ]
      },
      "them":{
        left:{
          showVideo:true,
          colorMode:"black",
          videoSrc: we_we
        },
        center:{
          showVideo:true,
          colorMode:"black",
          videoSrc: we_we
        },
        right:{
          showVideo:true,
          colorMode:"black",
          videoSrc: we_we
        },
                sound: '/audio/they-they.mp3',
                soundLoop: true,
  subjectDescription:"THE SUBJECTS ARE OBJECTS THAT SURROUND OUR READER'S VICTIMHOOD.",
  objectDescription:"THE OBJECTS THE READERS ARE WATCHING ARE IN A MOVIE BEING SHOT.",
  poem: [
          "{They} are the monsters",
          "[they] said so [themselves]",
          "that moment.",
          "",
          "{They} shot [themselves].",
          "{They} opened [their] mouths",
          "and waited",
          "",
          "until the dark",
          "passed through",
          "[their] shining teeth.",
          "",
          "{They} yelled pride",
          "and shook [their] middles",
          "down the street like",
          "",
          "beggers of love",
          "making the tired, human",
          "mistakes of the unremarkable."
        ]
      },
    }
  }