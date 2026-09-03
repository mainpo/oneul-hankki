import type { Cuisine, DisplayIngredient, Recipe } from "./types";

function item(
  name: string,
  amount: number | null,
  unit: string,
  staple = false,
): DisplayIngredient {
  return { name, amount, unit, staple };
}

function recipe(
  id: string,
  name: string,
  cuisine: Cuisine,
  minutes: number,
  required: string[],
  ingredients: DisplayIngredient[],
  steps: string[],
): Recipe {
  return { id, name, cuisine, minutes, baseServings: 1, required, ingredients, steps };
}

export const RECIPES: Recipe[] = [
  recipe("gyeran-jjim", "계란찜", "한식", 12, ["egg"], [
    item("계란", 2, "개"),
    item("물", 80, "ml", true),
    item("소금", 1, "꼬집", true),
    item("대파", null, "조금"),
  ], [
    "계란을 풀어 소금과 물을 섞는다.",
    "전자레인지 용기나 냄비에 담고 중불로 굳을 때까지 찐다.",
    "대파를 올리면 끝.",
  ]),
  recipe("gyeran-guk", "계란국", "한식", 10, ["egg", "green-onion"], [
    item("계란", 1, "개"),
    item("대파", 10, "g"),
    item("물", 300, "ml", true),
    item("간장", 1, "작은술", true),
  ], [
    "물에 간장으로 간한다.",
    "풀어 둔 계란을 흘려 넣고 한소끔 끓인다.",
    "대파를 넣고 불을 끈다.",
  ]),
  recipe("gyeran-mari", "계란말이", "한식", 15, ["egg"], [
    item("계란", 3, "개"),
    item("소금", 1, "꼬집", true),
    item("식용유", 1, "작은술", true),
    item("대파", null, "조금"),
  ], [
    "계란을 풀어 소금을 넣는다.",
    "팬에 기름을 두르고 얇게 부어 말기를 반복한다.",
    "한김 식혀 썰어 낸다.",
  ]),
  recipe("ganjang-gyeran-bap", "간장계란밥", "한식", 5, ["egg", "rice"], [
    item("밥", 1, "공기"),
    item("계란", 1, "개"),
    item("간장", 1, "작은술", true),
    item("참기름", 1, "작은술", true),
  ], [
    "밥 위에 계란후라이를 올린다.",
    "간장과 참기름을 둘러 비빈다.",
  ]),
  recipe("gyeran-bokkeumbap", "계란볶음밥", "한식", 15, ["egg", "rice", "green-onion"], [
    item("밥", 1, "공기"),
    item("계란", 2, "개"),
    item("대파", 20, "g"),
    item("식용유", 1, "큰술", true),
    item("간장", 1, "작은술", true),
  ], [
    "대파를 볶아 향을 낸다.",
    "계란을 스크램블한 뒤 밥을 넣고 볶는다.",
    "간장으로 간한다.",
  ]),
  recipe("kimchi-bokkeumbap", "김치볶음밥", "한식", 15, ["kimchi", "rice"], [
    item("김치", 120, "g"),
    item("밥", 1, "공기"),
    item("식용유", 1, "큰술", true),
    item("고추장", 0.5, "작은술", true),
  ], [
    "김치를 잘게 썰어 기름에 볶는다.",
    "밥을 넣고 고추장과 함께 볶는다.",
  ]),
  recipe("kimchi-jjigae", "김치찌개", "한식", 30, ["kimchi", "pork"], [
    item("김치", 150, "g"),
    item("돼지고기", 80, "g"),
    item("두부", 80, "g"),
    item("물", 350, "ml", true),
    item("고춧가루", 1, "작은술", true),
  ], [
    "돼지고기와 김치를 함께 볶는다.",
    "물을 붓고 끓인 뒤 두부를 넣는다.",
    "고춧가루로 색을 낸다.",
  ]),
  recipe("tuna-kimchi-jjigae", "참치김치찌개", "한식", 25, ["kimchi", "tuna"], [
    item("김치", 150, "g"),
    item("참치캔", 1, "캔"),
    item("물", 300, "ml", true),
    item("고춧가루", 1, "작은술", true),
  ], [
    "김치를 볶다가 물을 붓는다.",
    "참치를 넣고 한소끔 끓인다.",
  ]),
  recipe("doenjang-jjigae", "된장찌개", "한식", 25, ["tofu", "onion"], [
    item("두부", 120, "g"),
    item("양파", 0.25, "개"),
    item("감자", 0.5, "개"),
    item("애호박", 0.25, "개"),
    item("된장", 1, "큰술", true),
    item("물", 350, "ml", true),
  ], [
    "물에 된장을 풀어 끓인다.",
    "양파·감자·애호박을 넣고 익힌다.",
    "두부를 넣어 한소끔 더 끓인다.",
  ]),
  recipe("dubu-jorim", "두부조림", "한식", 20, ["tofu"], [
    item("두부", 150, "g"),
    item("간장", 1.5, "큰술", true),
    item("고춧가루", 0.5, "작은술", true),
    item("마늘", 1, "쪽", true),
    item("물", 50, "ml", true),
  ], [
    "두부를 두툼하게 썰어 앞뒤로 굽는다.",
    "간장·고춧가루·물을 부어 조린다.",
  ]),
  recipe("kimchi-dubu-jorim", "김치두부조림", "한식", 20, ["kimchi", "tofu"], [
    item("김치", 80, "g"),
    item("두부", 120, "g"),
    item("식용유", 1, "큰술", true),
    item("고춧가루", 0.5, "작은술", true),
  ], [
    "김치를 볶다가 구운 두부를 넣는다.",
    "국물이 자작하게 조린다.",
  ]),
  recipe("dubu-kimchi", "두부김치", "한식", 20, ["tofu", "kimchi"], [
    item("두부", 150, "g"),
    item("김치", 100, "g"),
    item("돼지고기", 40, "g"),
    item("참기름", 1, "작은술", true),
  ], [
    "두부를 데치거나 굽는다.",
    "김치와 돼지고기를 볶아 곁들인다.",
  ]),
  recipe("jeyuk", "제육볶음", "한식", 25, ["pork", "onion"], [
    item("돼지고기", 150, "g"),
    item("양파", 0.5, "개"),
    item("고추장", 1, "큰술", true),
    item("간장", 1, "작은술", true),
    item("고춧가루", 1, "작은술", true),
  ], [
    "고추장 양념에 돼지고기를 재운다.",
    "양파와 함께 센 불에서 볶는다.",
  ]),
  recipe("jeyuk-deopbap", "제육덮밥", "한식", 25, ["pork", "rice", "onion"], [
    item("돼지고기", 120, "g"),
    item("밥", 1, "공기"),
    item("양파", 0.4, "개"),
    item("고추장", 1, "큰술", true),
  ], [
    "제육을 볶아 밥 위에 올린다.",
  ]),
  recipe("bulgogi", "소불고기", "한식", 25, ["beef", "onion"], [
    item("소고기", 120, "g"),
    item("양파", 0.5, "개"),
    item("간장", 1.5, "큰술", true),
    item("설탕", 1, "작은술", true),
    item("마늘", 1, "쪽", true),
  ], [
    "간장 양념에 소고기를 재운다.",
    "양파와 함께 볶는다.",
  ]),
  recipe("beef-bokkeumbap", "소고기볶음밥", "한식", 15, ["beef", "rice"], [
    item("소고기", 70, "g"),
    item("밥", 1, "공기"),
    item("간장", 1, "작은술", true),
    item("식용유", 1, "큰술", true),
  ], [
    "소고기를 먼저 볶고 밥을 넣어 간장으로 볶는다.",
  ]),
  recipe("dakbokkeumtang", "닭볶음탕", "한식", 40, ["chicken", "potato"], [
    item("닭고기", 200, "g"),
    item("감자", 1, "개"),
    item("당근", 0.3, "개"),
    item("양파", 0.5, "개"),
    item("고추장", 1, "큰술", true),
    item("고춧가루", 1, "큰술", true),
  ], [
    "닭을 한 번 데친다.",
    "양념과 감자·당근·양파를 넣고 자작하게 끓인다.",
  ]),
  recipe("dakgalbi", "닭갈비", "한식", 25, ["chicken", "onion", "green-onion"], [
    item("닭고기", 180, "g"),
    item("양파", 0.4, "개"),
    item("대파", 30, "g"),
    item("고추장", 1.5, "큰술", true),
  ], [
    "고추장 양념에 닭을 버무린다.",
    "양파·대파와 함께 볶는다.",
  ]),
  recipe("kongnamul-guk", "콩나물국", "한식", 15, ["bean-sprout"], [
    item("콩나물", 120, "g"),
    item("대파", 10, "g"),
    item("물", 400, "ml", true),
    item("소금", 1, "꼬집", true),
    item("마늘", 1, "쪽", true),
  ], [
    "콩나물을 넣고 뚜껑을 연 채 끓인다.",
    "소금·마늘로 간하고 대파를 넣는다.",
  ]),
  recipe("kongnamul-muchim", "콩나물무침", "한식", 10, ["bean-sprout"], [
    item("콩나물", 120, "g"),
    item("참기름", 1, "작은술", true),
    item("소금", 1, "꼬집", true),
    item("마늘", 0.5, "쪽", true),
  ], [
    "콩나물을 데쳐 물기를 뺀다.",
    "참기름·소금·마늘에 무친다.",
  ]),
  recipe("sukju-bokkeum", "숙주볶음", "한식", 10, ["mung-sprout"], [
    item("숙주", 150, "g"),
    item("식용유", 1, "작은술", true),
    item("소금", 1, "꼬집", true),
  ], [
    "팬에 숙주를 넣고 숨이 죽을 때까지만 볶는다.",
  ]),
  recipe("gamja-jorim", "감자조림", "한식", 25, ["potato"], [
    item("감자", 1.5, "개"),
    item("간장", 1.5, "큰술", true),
    item("설탕", 1, "작은술", true),
    item("물", 120, "ml", true),
  ], [
    "감자를 한입 크기로 썬다.",
    "간장 물을 붓고 윤기 나게 조린다.",
  ]),
  recipe("gamja-bokkeum", "감자볶음", "한식", 15, ["potato"], [
    item("감자", 1, "개"),
    item("식용유", 1, "큰술", true),
    item("소금", 1, "꼬집", true),
  ], [
    "감자를 채 썰어 투명해질 때까지 볶는다.",
  ]),
  recipe("hobak-bokkeum", "애호박볶음", "한식", 12, ["zucchini"], [
    item("애호박", 0.5, "개"),
    item("식용유", 1, "작은술", true),
    item("소금", 1, "꼬집", true),
  ], [
    "애호박을 반달 썰어 숨이 죽을 때까지 볶는다.",
  ]),
  recipe("beoseot-bokkeum", "버섯볶음", "한식", 12, ["mushroom"], [
    item("버섯", 100, "g"),
    item("식용유", 1, "작은술", true),
    item("간장", 1, "작은술", true),
  ], [
    "버섯을 센 불에서 수분이 날아갈 때까지 볶는다.",
  ]),
  recipe("carrot-bokkeum", "당근볶음", "한식", 12, ["carrot"], [
    item("당근", 0.5, "개"),
    item("식용유", 1, "작은술", true),
    item("소금", 1, "꼬집", true),
  ], [
    "당근을 채 썰어 부드럽게 볶는다.",
  ]),
  recipe("ojingeo-bokkeum", "오징어볶음", "한식", 20, ["squid", "onion"], [
    item("오징어", 150, "g"),
    item("양파", 0.5, "개"),
    item("고추장", 1, "큰술", true),
    item("고춧가루", 1, "작은술", true),
  ], [
    "오징어는 너무 오래 볶지 않는다.",
    "양파와 고추장 양념에 재빨리 볶는다.",
  ]),
  recipe("spam-kimchi", "스팸김치볶음", "한식", 12, ["spam", "kimchi"], [
    item("스팸", 80, "g"),
    item("김치", 80, "g"),
    item("식용유", 1, "작은술", true),
  ], [
    "스팸을 구운 뒤 김치를 넣고 볶는다.",
  ]),
  recipe("spam-gui", "스팸구이", "한식", 8, ["spam"], [
    item("스팸", 100, "g"),
  ], [
    "스팸을 두께 있게 썰어 팬에 앞뒤로 굽는다.",
  ]),
  recipe("ramen", "라면", "한식", 10, ["ramen"], [
    item("라면", 1, "봉지"),
    item("물", 500, "ml", true),
    item("계란", 1, "개"),
    item("대파", 10, "g"),
  ], [
    "물과 스프를 끓인다.",
    "면을 넣고 익힌 뒤 계란·대파를 올리면 더 좋다.",
  ]),
  recipe("kimchi-ramen", "김치라면", "한식", 12, ["ramen", "kimchi"], [
    item("라면", 1, "봉지"),
    item("김치", 80, "g"),
    item("물", 450, "ml", true),
  ], [
    "김치를 먼저 볶고 물을 부어 라면을 끓인다.",
  ]),
  recipe("kkaennip-muchim", "깻잎무침", "한식", 10, ["perilla"], [
    item("깻잎", 15, "장"),
    item("간장", 1, "큰술", true),
    item("고춧가루", 0.5, "작은술", true),
    item("마늘", 0.5, "쪽", true),
  ], [
    "깻잎을 씻어 물기를 턴다.",
    "간장 양념을 켜켜이 바른다.",
  ]),
  recipe("oi-muchim", "오이무침", "한식", 8, ["cucumber"], [
    item("오이", 1, "개"),
    item("고춧가루", 1, "작은술", true),
    item("식초", 1, "작은술", true),
    item("소금", 1, "꼬집", true),
  ], [
    "오이를 소금에 살짝 절인다.",
    "고춧가루와 식초에 무친다.",
  ]),
  recipe("ham-egg", "햄계란볶음", "한식", 10, ["ham", "egg"], [
    item("햄", 60, "g"),
    item("계란", 2, "개"),
    item("식용유", 1, "작은술", true),
  ], [
    "햄을 볶다가 계란을 풀어 함께 익힌다.",
  ]),
  recipe("sausage-veg", "소시지야채볶음", "한식", 15, ["sausage", "onion", "carrot"], [
    item("소시지", 80, "g"),
    item("양파", 0.4, "개"),
    item("당근", 0.3, "개"),
    item("식용유", 1, "큰술", true),
  ], [
    "소시지와 야채를 한입 크기로 썰어 볶는다.",
  ]),
  recipe("tuna-deopbap", "참치덮밥", "한식", 10, ["tuna", "rice"], [
    item("참치캔", 0.5, "캔"),
    item("밥", 1, "공기"),
    item("간장", 1, "작은술", true),
    item("참기름", 1, "작은술", true),
  ], [
    "참치 기름을 살짝 빼고 밥 위에 올린다.",
    "간장과 참기름을 둘러 비빈다.",
  ]),
  recipe("broccoli-bokkeum", "브로콜리볶음", "한식", 10, ["broccoli"], [
    item("브로콜리", 100, "g"),
    item("식용유", 1, "작은술", true),
    item("소금", 1, "꼬집", true),
  ], [
    "브로콜리를 한입 크기로 잘라 숨이 죽을 때까지 볶는다.",
  ]),
  recipe("omelette", "오믈렛", "집양식", 15, ["egg", "milk"], [
    item("계란", 2, "개"),
    item("우유", 2, "큰술"),
    item("버터", 5, "g"),
    item("소금", 1, "꼬집", true),
  ], [
    "계란과 우유를 풀어 약불에 익힌다.",
    "반달로 접어 낸다.",
  ]),
  recipe("cheese-omelette", "치즈오믈렛", "집양식", 15, ["egg", "cheese"], [
    item("계란", 2, "개"),
    item("치즈", 1, "장"),
    item("버터", 5, "g"),
    item("소금", 1, "꼬집", true),
  ], [
    "계란을 익히다 치즈를 넣고 접는다.",
  ]),
  recipe("scramble", "스크램블에그", "집양식", 10, ["egg", "milk"], [
    item("계란", 2, "개"),
    item("우유", 1, "큰술"),
    item("버터", 5, "g"),
    item("소금", 1, "꼬집", true),
  ], [
    "약불에서 저어 가며 부드럽게 익힌다.",
  ]),
  recipe("tomato-pasta", "토마토파스타", "집양식", 25, ["spaghetti", "tomato"], [
    item("스파게티면", 80, "g"),
    item("토마토", 1.5, "개"),
    item("마늘", 1, "쪽", true),
    item("올리브식용유", 1, "큰술", true),
    item("소금", 1, "꼬집", true),
  ], [
    "면을 삶는다.",
    "토마토를 으깨 마늘과 함께 졸인 뒤 면을 버무린다.",
  ]),
  recipe("aglio-olio", "오일파스타", "집양식", 20, ["spaghetti", "chili"], [
    item("스파게티면", 80, "g"),
    item("고추", 1, "개"),
    item("마늘", 2, "쪽", true),
    item("식용유", 2, "큰술", true),
  ], [
    "기름에 마늘과 고추를 약불에서 향을 낸다.",
    "삶은 면을 넣고 면수로 윤기를 낸다.",
  ]),
  recipe("bacon-cream-pasta", "베이컨크림파스타", "집양식", 25, ["spaghetti", "bacon", "milk"], [
    item("스파게티면", 80, "g"),
    item("베이컨", 50, "g"),
    item("우유", 120, "ml"),
    item("치즈", 15, "g"),
    item("후추", null, "조금", true),
  ], [
    "베이컨을 볶아 기름을 낸다.",
    "우유를 넣고 졸이다 면을 버무린다.",
  ]),
  recipe("mushroom-pasta", "버섯파스타", "집양식", 25, ["spaghetti", "mushroom"], [
    item("스파게티면", 80, "g"),
    item("버섯", 80, "g"),
    item("마늘", 1, "쪽", true),
    item("식용유", 1, "큰술", true),
  ], [
    "버섯을 충분히 볶아 수분을 날린다.",
    "삶은 면과 함께 버무린다.",
  ]),
  recipe("shrimp-pasta", "새우오일파스타", "집양식", 25, ["spaghetti", "shrimp"], [
    item("스파게티면", 80, "g"),
    item("새우", 80, "g"),
    item("마늘", 2, "쪽", true),
    item("식용유", 1.5, "큰술", true),
  ], [
    "새우를 먼저 익히고 마늘 오일에 면을 버무린다.",
  ]),
  recipe("tuna-pasta", "참치파스타", "집양식", 20, ["spaghetti", "tuna"], [
    item("스파게티면", 80, "g"),
    item("참치캔", 0.5, "캔"),
    item("마늘", 1, "쪽", true),
    item("식용유", 1, "큰술", true),
  ], [
    "참치와 마늘을 볶아 면에 버무린다.",
  ]),
  recipe("cheese-toast", "치즈토스트", "집양식", 10, ["bread", "cheese", "butter"], [
    item("식빵", 2, "장"),
    item("치즈", 1, "장"),
    item("버터", 8, "g"),
  ], [
    "식빵에 버터와 치즈를 넣고 팬에서 노릇하게 굽는다.",
  ]),
  recipe("french-toast", "프렌치토스트", "집양식", 15, ["bread", "egg", "milk"], [
    item("식빵", 2, "장"),
    item("계란", 1, "개"),
    item("우유", 50, "ml"),
    item("버터", 8, "g"),
  ], [
    "계란과 우유를 풀어 식빵을 담근다.",
    "버터 팬에서 앞뒤로 굽는다.",
  ]),
  recipe("bacon-egg-toast", "베이컨에그토스트", "집양식", 15, ["bread", "bacon", "egg"], [
    item("식빵", 2, "장"),
    item("베이컨", 30, "g"),
    item("계란", 1, "개"),
    item("버터", 5, "g"),
  ], [
    "베이컨과 계란을 익혀 식빵에 올린다.",
  ]),
  recipe("tomato-salad", "토마토샐러드", "집양식", 10, ["tomato", "lettuce"], [
    item("토마토", 1, "개"),
    item("상추", 40, "g"),
    item("식초", 1, "작은술", true),
    item("소금", 1, "꼬집", true),
  ], [
    "토마토와 상추를 한입 크기로 썬다.",
    "식초와 소금으로 가볍게 버무린다.",
  ]),
  recipe("chicken-salad", "치킨샐러드", "집양식", 15, ["chicken", "lettuce"], [
    item("닭고기", 100, "g"),
    item("상추", 50, "g"),
    item("소금", 1, "꼬집", true),
    item("후추", null, "조금", true),
  ], [
    "닭을 소금·후추로 구워 찢는다.",
    "상추 위에 올린다.",
  ]),
  recipe("yogurt-bowl", "요거트볼", "집양식", 5, ["yogurt"], [
    item("요거트", 150, "g"),
  ], [
    "그릇에 요거트를 담는다. 집에 과일이나 견과가 있으면 올린다.",
  ]),
  recipe("veg-bokkeumbap", "야채볶음밥", "집양식", 15, ["rice", "carrot", "onion"], [
    item("밥", 1, "공기"),
    item("당근", 0.3, "개"),
    item("양파", 0.3, "개"),
    item("식용유", 1, "큰술", true),
    item("간장", 1, "작은술", true),
  ], [
    "야채를 먼저 볶고 밥을 넣어 간장으로 볶는다.",
  ]),
  recipe("shrimp-bokkeumbap", "새우볶음밥", "집양식", 15, ["shrimp", "rice", "egg"], [
    item("새우", 70, "g"),
    item("밥", 1, "공기"),
    item("계란", 1, "개"),
    item("식용유", 1, "큰술", true),
  ], [
    "새우와 계란을 따로 익힌 뒤 밥과 함께 볶는다.",
  ]),
  recipe("broccoli-cheese", "브로콜리치즈구이", "집양식", 20, ["broccoli", "cheese"], [
    item("브로콜리", 120, "g"),
    item("치즈", 30, "g"),
    item("소금", 1, "꼬집", true),
  ], [
    "브로콜리를 데친 뒤 치즈를 올려 치즈가 녹을 때까지 덮는다.",
  ]),
  recipe("tomato-egg", "토마토계란볶음", "집양식", 12, ["tomato", "egg"], [
    item("토마토", 1, "개"),
    item("계란", 2, "개"),
    item("식용유", 1, "큰술", true),
    item("소금", 1, "꼬집", true),
  ], [
    "계란을 먼저 익혀 덜어 둔다.",
    "토마토를 볶다 계란을 넣고 섞는다.",
  ]),
  recipe("cucumber-tomato-salad", "오이토마토샐러드", "집양식", 8, ["cucumber", "tomato"], [
    item("오이", 0.5, "개"),
    item("토마토", 1, "개"),
    item("식초", 1, "작은술", true),
    item("소금", 1, "꼬집", true),
  ], [
    "오이와 토마토를 썰어 식초·소금에 버무린다.",
  ]),
  recipe("kimchi-gyeran-bokkeum", "김치계란볶음", "한식", 10, ["kimchi", "egg"], [
    item("김치", 80, "g"),
    item("계란", 2, "개"),
    item("식용유", 1, "작은술", true),
  ], [
    "김치를 볶다가 계란을 풀어 함께 익힌다.",
  ]),
  recipe("pa-gyeran-bokkeum", "대파계란볶음", "한식", 8, ["green-onion", "egg"], [
    item("대파", 40, "g"),
    item("계란", 2, "개"),
    item("식용유", 1, "작은술", true),
    item("소금", 1, "꼬집", true),
  ], [
    "대파를 먼저 볶아 향을 내고 계란을 넣어 섞는다.",
  ]),
  recipe("gochujang-gyeran-bap", "고추장계란밥", "한식", 5, ["egg", "rice"], [
    item("밥", 1, "공기"),
    item("계란", 1, "개"),
    item("고추장", 1, "작은술", true),
    item("참기름", 1, "작은술", true),
  ], [
    "밥에 계란후라이를 올리고 고추장과 참기름을 비빈다.",
  ]),
  recipe("samgyeopsal-gui", "삼겹살구이", "한식", 15, ["pork"], [
    item("돼지고기", 150, "g"),
    item("소금", 1, "꼬집", true),
    item("후추", null, "조금", true),
  ], [
    "소금·후추를 뿌려 팬에 앞뒤로 굽는다.",
    "상추나 깻잎이 있으면 싸 먹는다.",
  ]),
  recipe("jeyuk-kimchi", "제육김치볶음", "한식", 20, ["pork", "kimchi"], [
    item("돼지고기", 120, "g"),
    item("김치", 100, "g"),
    item("고추장", 0.5, "큰술", true),
  ], [
    "돼지고기를 볶다가 김치를 넣고 고추장으로 간한다.",
  ]),
  recipe("pork-sukju", "돼지고기숙주볶음", "한식", 15, ["pork", "mung-sprout"], [
    item("돼지고기", 100, "g"),
    item("숙주", 120, "g"),
    item("간장", 1, "작은술", true),
    item("식용유", 1, "큰술", true),
  ], [
    "돼지고기를 먼저 볶고 숙주를 넣어 숨이 죽을 때까지만 볶는다.",
  ]),
  recipe("beef-sukju", "소고기숙주볶음", "한식", 12, ["beef", "mung-sprout"], [
    item("소고기", 80, "g"),
    item("숙주", 120, "g"),
    item("간장", 1, "작은술", true),
    item("식용유", 1, "큰술", true),
  ], [
    "소고기를 볶고 숙주를 넣어 재빨리 섞는다.",
  ]),
  recipe("dak-gui", "닭가슴살구이", "한식", 15, ["chicken"], [
    item("닭고기", 150, "g"),
    item("소금", 1, "꼬집", true),
    item("후추", null, "조금", true),
  ], [
    "두툼하게 펴서 소금·후추로 굽는다.",
  ]),
  recipe("dak-bokkeumbap", "닭볶음밥", "한식", 15, ["chicken", "rice"], [
    item("닭고기", 80, "g"),
    item("밥", 1, "공기"),
    item("간장", 1, "작은술", true),
    item("식용유", 1, "큰술", true),
  ], [
    "닭을 먼저 볶고 밥을 넣어 간장으로 볶는다.",
  ]),
  recipe("dak-kimchi-jjim", "닭김치찜", "한식", 35, ["chicken", "kimchi"], [
    item("닭고기", 180, "g"),
    item("김치", 150, "g"),
    item("고춧가루", 1, "작은술", true),
    item("물", 200, "ml", true),
  ], [
    "닭과 김치를 함께 볶다가 물을 붓고 자작하게 끓인다.",
  ]),
  recipe("gamja-gyeran-bokkeum", "감자계란볶음", "한식", 15, ["potato", "egg"], [
    item("감자", 1, "개"),
    item("계란", 2, "개"),
    item("식용유", 1, "큰술", true),
    item("소금", 1, "꼬집", true),
  ], [
    "감자를 채 썰어 익힌 뒤 계란을 풀어 섞는다.",
  ]),
  recipe("beoseot-gyeran-guk", "버섯계란국", "한식", 12, ["mushroom", "egg"], [
    item("버섯", 80, "g"),
    item("계란", 1, "개"),
    item("물", 350, "ml", true),
    item("간장", 1, "작은술", true),
  ], [
    "버섯을 넣고 끓이다 계란을 흘려 넣는다.",
  ]),
  recipe("kongnamul-bap", "콩나물밥", "한식", 15, ["bean-sprout", "rice"], [
    item("콩나물", 80, "g"),
    item("밥", 1, "공기"),
    item("간장", 1, "작은술", true),
    item("참기름", 1, "작은술", true),
  ], [
    "데친 콩나물을 밥에 올리고 간장·참기름을 둘러 비빈다.",
  ]),
  recipe("ojingeo-deopbap", "오징어덮밥", "한식", 20, ["squid", "rice", "onion"], [
    item("오징어", 120, "g"),
    item("밥", 1, "공기"),
    item("양파", 0.3, "개"),
    item("고추장", 1, "큰술", true),
  ], [
    "오징어와 양파를 고추장에 볶아 밥 위에 올린다.",
  ]),
  recipe("ojingeo-kimchi", "오징어김치볶음", "한식", 15, ["squid", "kimchi"], [
    item("오징어", 120, "g"),
    item("김치", 80, "g"),
    item("고춧가루", 0.5, "작은술", true),
  ], [
    "김치와 오징어를 센 불에서 짧게 볶는다.",
  ]),
  recipe("saewoo-gyeran-jjim", "새우계란찜", "한식", 15, ["shrimp", "egg"], [
    item("새우", 60, "g"),
    item("계란", 2, "개"),
    item("물", 60, "ml", true),
    item("소금", 1, "꼬집", true),
  ], [
    "새우를 넣고 계란물을 부어 찐다.",
  ]),
  recipe("matsal-bokkeum", "맛살볶음", "한식", 8, ["crab-stick"], [
    item("맛살", 80, "g"),
    item("식용유", 1, "작은술", true),
    item("간장", 0.5, "작은술", true),
  ], [
    "맛살을 찢어 팬에 살짝 볶는다.",
  ]),
  recipe("matsal-gyeran", "맛살계란볶음", "한식", 10, ["crab-stick", "egg"], [
    item("맛살", 60, "g"),
    item("계란", 2, "개"),
    item("식용유", 1, "작은술", true),
  ], [
    "맛살을 볶다가 계란을 풀어 섞는다.",
  ]),
  recipe("ssam-bap", "상추쌈밥", "한식", 10, ["lettuce", "rice"], [
    item("상추", 50, "g"),
    item("밥", 1, "공기"),
    item("고추장", 1, "작은술", true),
    item("참기름", 1, "작은술", true),
  ], [
    "고추장과 참기름을 섞어 밥과 상추에 싸 먹는다.",
  ]),
  recipe("kkaennip-ssam", "깻잎쌈", "한식", 10, ["perilla", "pork"], [
    item("깻잎", 10, "장"),
    item("돼지고기", 100, "g"),
    item("소금", 1, "꼬집", true),
  ], [
    "돼지고기를 구워 깻잎에 싸 먹는다.",
  ]),
  recipe("gochu-doenjang", "고추된장무침", "한식", 5, ["chili"], [
    item("고추", 3, "개"),
    item("된장", 1, "큰술", true),
    item("마늘", 0.5, "쪽", true),
  ], [
    "고추를 어슷 썰어 된장에 찍어 먹거나 살짝 무친다.",
  ]),
  recipe("oi-onion-muchim", "오이양파무침", "한식", 8, ["cucumber", "onion"], [
    item("오이", 1, "개"),
    item("양파", 0.25, "개"),
    item("식초", 1, "작은술", true),
    item("소금", 1, "꼬집", true),
  ], [
    "오이와 양파를 얇게 썰어 식초·소금에 무친다.",
  ]),
  recipe("paprika-bokkeum", "파프리카볶음", "한식", 10, ["paprika"], [
    item("파프리카", 1, "개"),
    item("식용유", 1, "작은술", true),
    item("소금", 1, "꼬집", true),
  ], [
    "파프리카를 채 썰어 숨이 죽을 때까지만 볶는다.",
  ]),
  recipe("paprika-gyeran", "파프리카계란볶음", "한식", 10, ["paprika", "egg"], [
    item("파프리카", 0.5, "개"),
    item("계란", 2, "개"),
    item("식용유", 1, "작은술", true),
  ], [
    "파프리카를 볶다가 계란을 넣어 섞는다.",
  ]),
  recipe("broccoli-gyeran", "브로콜리계란볶음", "한식", 12, ["broccoli", "egg"], [
    item("브로콜리", 80, "g"),
    item("계란", 2, "개"),
    item("식용유", 1, "작은술", true),
    item("소금", 1, "꼬집", true),
  ], [
    "브로콜리를 볶다가 계란을 풀어 함께 익힌다.",
  ]),
  recipe("dubu-gyeran-tang", "두부계란탕", "한식", 15, ["tofu", "egg"], [
    item("두부", 120, "g"),
    item("계란", 1, "개"),
    item("물", 350, "ml", true),
    item("간장", 1, "작은술", true),
  ], [
    "두부를 넣고 끓이다 계란을 풀어 넣는다.",
  ]),
  recipe("ham-kimchi-bap", "햄김치볶음밥", "한식", 15, ["ham", "kimchi", "rice"], [
    item("햄", 50, "g"),
    item("김치", 80, "g"),
    item("밥", 1, "공기"),
    item("식용유", 1, "큰술", true),
  ], [
    "햄과 김치를 볶고 밥을 넣어 볶는다.",
  ]),
  recipe("spam-gyeran-bap", "스팸계란볶음밥", "한식", 12, ["spam", "egg", "rice"], [
    item("스팸", 60, "g"),
    item("계란", 1, "개"),
    item("밥", 1, "공기"),
    item("식용유", 1, "큰술", true),
  ], [
    "스팸과 계란을 볶고 밥을 넣어 섞는다.",
  ]),
  recipe("tuna-kimchi-bap", "참치김치볶음밥", "한식", 12, ["tuna", "kimchi", "rice"], [
    item("참치캔", 0.5, "캔"),
    item("김치", 80, "g"),
    item("밥", 1, "공기"),
  ], [
    "김치와 참치를 볶고 밥을 넣어 볶는다.",
  ]),
  recipe("pork-kimchi-bap", "돼지고기김치볶음밥", "한식", 15, ["pork", "kimchi", "rice"], [
    item("돼지고기", 70, "g"),
    item("김치", 80, "g"),
    item("밥", 1, "공기"),
  ], [
    "돼지고기와 김치를 볶고 밥을 넣는다.",
  ]),
  recipe("gyeran-ramen", "계란라면", "한식", 10, ["ramen", "egg"], [
    item("라면", 1, "봉지"),
    item("계란", 1, "개"),
    item("물", 500, "ml", true),
  ], [
    "라면을 끓이다 마지막에 계란을 풀어 넣는다.",
  ]),
  recipe("sausage-ramen", "소시지라면", "한식", 12, ["ramen", "sausage"], [
    item("라면", 1, "봉지"),
    item("소시지", 50, "g"),
    item("물", 500, "ml", true),
  ], [
    "소시지를 넣고 라면을 끓인다.",
  ]),
  recipe("cheese-ramen", "치즈라면", "한식", 10, ["ramen", "cheese"], [
    item("라면", 1, "봉지"),
    item("치즈", 1, "장"),
    item("물", 450, "ml", true),
  ], [
    "라면이 익으면 불을 끄고 치즈를 올려 녹인다.",
  ]),
  recipe("spam-ramen", "스팸라면", "한식", 12, ["ramen", "spam"], [
    item("라면", 1, "봉지"),
    item("스팸", 50, "g"),
    item("물", 500, "ml", true),
  ], [
    "스팸을 넣고 라면을 끓인다.",
  ]),
  recipe("cheese-scramble", "치즈스크램블", "집양식", 10, ["egg", "cheese", "milk"], [
    item("계란", 2, "개"),
    item("치즈", 20, "g"),
    item("우유", 1, "큰술"),
    item("버터", 5, "g"),
  ], [
    "약불에서 저어 익히다 치즈를 넣어 녹인다.",
  ]),
  recipe("tomato-cheese-pasta", "토마토치즈파스타", "집양식", 25, ["spaghetti", "tomato", "cheese"], [
    item("스파게티면", 80, "g"),
    item("토마토", 1.5, "개"),
    item("치즈", 20, "g"),
    item("마늘", 1, "쪽", true),
  ], [
    "토마토 소스에 면을 버무린 뒤 치즈를 올린다.",
  ]),
  recipe("bacon-tomato-pasta", "베이컨토마토파스타", "집양식", 25, ["spaghetti", "bacon", "tomato"], [
    item("스파게티면", 80, "g"),
    item("베이컨", 40, "g"),
    item("토마토", 1, "개"),
  ], [
    "베이컨을 볶고 토마토를 으깨 면에 버무린다.",
  ]),
  recipe("ham-cheese-toast", "햄치즈토스트", "집양식", 10, ["bread", "ham", "cheese"], [
    item("식빵", 2, "장"),
    item("햄", 1, "장"),
    item("치즈", 1, "장"),
    item("버터", 5, "g"),
  ], [
    "식빵에 햄과 치즈를 넣고 팬에서 굽는다.",
  ]),
  recipe("sausage-egg-toast", "소시지에그토스트", "집양식", 12, ["bread", "sausage", "egg"], [
    item("식빵", 2, "장"),
    item("소시지", 40, "g"),
    item("계란", 1, "개"),
  ], [
    "소시지와 계란을 익혀 식빵에 올린다.",
  ]),
  recipe("yogurt-salad", "요거트샐러드", "집양식", 8, ["yogurt", "lettuce"], [
    item("요거트", 80, "g"),
    item("상추", 50, "g"),
    item("소금", 1, "꼬집", true),
  ], [
    "상추를 요거트에 가볍게 버무린다.",
  ]),
  recipe("oi-yogurt", "오이요거트무침", "집양식", 5, ["yogurt", "cucumber"], [
    item("요거트", 80, "g"),
    item("오이", 1, "개"),
    item("소금", 1, "꼬집", true),
  ], [
    "오이를 얇게 썰어 요거트에 무친다.",
  ]),
  recipe("chicken-cheese-salad", "치킨치즈샐러드", "집양식", 15, ["chicken", "cheese", "lettuce"], [
    item("닭고기", 80, "g"),
    item("치즈", 20, "g"),
    item("상추", 50, "g"),
  ], [
    "구운 닭과 치즈를 상추 위에 올린다.",
  ]),
  recipe("shrimp-salad", "새우샐러드", "집양식", 12, ["shrimp", "lettuce"], [
    item("새우", 70, "g"),
    item("상추", 50, "g"),
    item("소금", 1, "꼬집", true),
  ], [
    "새우를 익혀 상추와 함께 담는다.",
  ]),
  recipe("mushroom-omelette", "버섯오믈렛", "집양식", 15, ["egg", "mushroom"], [
    item("계란", 2, "개"),
    item("버섯", 50, "g"),
    item("버터", 5, "g"),
    item("소금", 1, "꼬집", true),
  ], [
    "버섯을 볶고 계란을 부어 접는다.",
  ]),
  recipe("tomato-omelette", "토마토오믈렛", "집양식", 15, ["egg", "tomato"], [
    item("계란", 2, "개"),
    item("토마토", 0.5, "개"),
    item("버터", 5, "g"),
  ], [
    "토마토를 볶고 계란을 부어 접는다.",
  ]),
  recipe("butter-potato", "버터감자구이", "집양식", 20, ["potato", "butter"], [
    item("감자", 1.5, "개"),
    item("버터", 10, "g"),
    item("소금", 1, "꼬집", true),
  ], [
    "감자를 한입 크기로 썰어 버터에 노릇하게 굽는다.",
  ]),
  recipe("cheese-potato", "치즈감자구이", "집양식", 20, ["potato", "cheese"], [
    item("감자", 1.5, "개"),
    item("치즈", 30, "g"),
    item("소금", 1, "꼬집", true),
  ], [
    "감자를 구운 뒤 치즈를 올려 녹인다.",
  ]),
  recipe("matsal-salad", "맛살샐러드", "집양식", 8, ["crab-stick", "lettuce"], [
    item("맛살", 60, "g"),
    item("상추", 40, "g"),
    item("소금", 1, "꼬집", true),
  ], [
    "맛살을 찢어 상추와 함께 담는다.",
  ]),
  recipe("paprika-salad", "파프리카샐러드", "집양식", 8, ["paprika", "lettuce"], [
    item("파프리카", 0.5, "개"),
    item("상추", 40, "g"),
    item("식초", 1, "작은술", true),
  ], [
    "파프리카와 상추를 썰어 식초에 버무린다.",
  ]),
  recipe("bacon-bokkeumbap", "베이컨볶음밥", "집양식", 12, ["bacon", "rice"], [
    item("베이컨", 40, "g"),
    item("밥", 1, "공기"),
    item("간장", 0.5, "작은술", true),
  ], [
    "베이컨 기름에 밥을 볶는다.",
  ]),
  recipe("ham-bokkeumbap", "햄계란볶음밥", "집양식", 12, ["ham", "egg", "rice"], [
    item("햄", 50, "g"),
    item("계란", 1, "개"),
    item("밥", 1, "공기"),
    item("식용유", 1, "큰술", true),
  ], [
    "햄과 계란을 볶고 밥을 넣어 섞는다.",
  ]),
];
