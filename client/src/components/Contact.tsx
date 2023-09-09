import { IContact } from "../typings/Home";
import { shuffle, take, rearg } from "lodash";

const ContactList: IContact<string>[] = [
  {
    Firstname: "Jhon",
    Lastname: "nelson",
    Image:
      "https://st2.depositphotos.com/6672578/9743/i/450/depositphotos_97431594-stock-photo-businessman-smiling-confidently-at-camera.jpg",
    Date: "Jan 9, 2014",
  },
  {
    Firstname: "Lamania",
    Lastname: "vicky",
    Image:
      "https://nationaltoday.com/wp-content/uploads/2021/09/American-Business-Womens-Day-1200x834.jpg",
    Date: "Jan 7, 2014",
  },
  {
    Firstname: "Fani",
    Lastname: "rolinda",
    Image:
      "https://www.procopio.com/static/ee6af0881ebf1148a7746bed03444e63/aab3c/Sara-Neva-profile.jpg",
    Date: "July 20, 2014",
  },
  {
    Firstname: "Brahimi",
    Lastname: "perterson",
    Image:
      "https://s3.ap-south-1.amazonaws.com/modelfactory.in/upload/2023/Mar/01/blog_images/ee68f168aa43d0bf401e9b8958adcc44.jpg",
    Date: "Dec 01, 2012",
  },
  {
    Firstname: "Jorvina",
    Lastname: "siarra",
    Image:
      "https://liveboldandbloom.com/wp-content/uploads/2020/12/Untitled-design-5-1-1-768x538.png",
    Date: "Feb 22, 2009",
  },
  {
    Firstname: "Francesca",
    Lastname: "Djouli",
    Image:
      "https://doximity-res.cloudinary.com/images/f_auto,q_auto,t_profile_photo_320x320/za52pozqavhqbqddn8cn/allison-ringena-schoolman-grundy-center-ia.jpg",
    Date: "Feb 03, 2007",
  },
  {
    Firstname: "Kendar",
    Lastname: "jenner",
    Image: "https://www.shefinds.com/files/2022/12/Kendall-Jenner-.jpg",
    Date: "March 03, 2015",
  },
];

const UserContacts = rearg(
  function (contact: IContact<string>[], nofUser: number): IContact<string>[] {
    // get user contacts by random
    const contactRandomization = shuffle(contact);
    // determine number of users to see in the contact by the active user
    return take(contactRandomization, nofUser);
  },
  [0, 1]
);

export { ContactList, UserContacts };
