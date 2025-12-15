export default function isStringAnagram(str1: string, str2: string): boolean {
  if (str1.length !== str2.length) {
    return false;
  }

  const str1_arr = str1.split('');
  const str2_arr = str2.split('');
  const l = str2_arr.length;
  for (let i = 0; i < l; i++) {
    const index = str2_arr.indexOf(str1_arr[0]);
    console.log('index', index);
    if (index === -1) {
      return false;
    }
    str2_arr.splice(index, 1);
    str1_arr.shift();
  }
  console.log('str1_arr', str1_arr);
  return str1_arr.length === 0;
}

// const str1 =
//   'xzcwtsdbmgdcjlpkluvtgtihgbddpawvvspvubafqcktblwyqqzwoxmvoezoldagygwmdwiffuadmkzgxdhwxeoxgkdzrrtvpsgrmaxnuodvjgukiavzmcuqjfdzajlmyjnldkrtvnlnfdlqbzljtwiaujlegjxssfqpsgljlqtuqlxrpllhejystitruaoztvxiqklhlkwiuqbgcejfawbdgqyamydryneanvmpclzkjvkjxkmaphgouitwzrthsdrcelbhkvatuobnbdniznpgviwcnbbgjccclfxvqikizrykyqpxmdjjjppvwwdyplmlsipkiuqggsjkxjfmtuxuofhanorsckibawtvpwfyenmzdbxtweexvueodcnnfmzwndeatmpukwxaskwjsaztywhqbbfnuphvqejhgeyodznigecfngqgtljcpwyeegkrnoxutuxrclixtbsxhncftsfhduejiqxnljyhxnyawkdcrqdtjpctxfzmldarvyohaplwhtazjkqhaopphjcnhtbblerdpotlqaqwfnyikguzivjjcivstwnyjmsszolkqjrlifdbxhuvghipjlonadpnvcrpuvjogxabkawaythraxnwhizgsxzreyxtzagfyuwatcptrrmbznwuofrkfkoymmakqasnmwvbordorswlkztzbjnkvpepowmbenh';
// const str2 =
//   'cwfkhvhzapsmnnohpduiqlcsalpzxjicakxzkjqftofctmebqlgvnokffliqwktkweqbuxziacnxnkmjevcjruyaezcxzgyznzwubjysuytnjndcgmwnrdfxknbdxothxjqiutrewrmqewmvoeghqtuddpclzodsgmgzqbhasdjepofhotflehqwjcxnrmbhvqazyshvxjnnvnwphlnfehbuygibbjcyzeiwsxmabatzlrxrsfufnkbookfsvyrueblysbcolgztsmsteuvsggyxkrthmhvxvupjjdiixuyfdlomkcopduuuuixowqodvdpkulejnlfzzzadigripiyvgsgdmwpogtovhtvvjdmvuhnbfomfpwbugulsfbsszingfhgsjfbvpestrrbmwtaeztpjeqvdbmxomwjyxbmpnuteajpmfhgjkcwtxgsjhuxwdndprssfweldxotexcoakfgwcyppujhggicjeowftfoothvmrvkizwlwxyxhheuwdaowkuxmevbkmungvcygortlmckcctwnlrmvqbeitoqbiruwrjmwwdikwxbmmjgthhnhxdtirnedfitbutyfawkkaybuoebnismrcdjxxjnsrrjwqkyfycabiacdsjorvexshmhxpdjxmcpnbzoqxscdvolojqhirfmeksbpscnudmoimqhdxwlpdcutbqo';

const str1 = 'abcd';
const str2 = 'dcba';

console.log(isStringAnagram(str1, str2));
