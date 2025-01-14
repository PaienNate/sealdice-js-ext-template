import { sample } from "lodash-es";
import { nameList } from "./utils";
import { SealdiceEngine } from "./utils/store/engine/sealdice";
import StormDB from "./utils/store/stormdb";

function main() {
  // 注册扩展
  let ext = seal.ext.find('test');
  if (!ext) {
    ext = seal.ext.new('test', '木落', '1.0.0');
    seal.ext.register(ext);
  }
  // 初始化DB工具
  let stormdb = new StormDB(new SealdiceEngine(ext))
  // 编写指令
  const cmdSeal = seal.ext.newCmdItemInfo();
  cmdSeal.name = 'seal';
  cmdSeal.help = '召唤一只海豹，可用.seal <名字> 命名';

  cmdSeal.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      case 'get':{
        // 获取用户的相关信息
        let id = ctx.player.userId;
        if (!val) val = sample(nameList); // 无参数，随机名字
        let random = Math.ceil(Math.random() * 100)
        seal.replyToSender(ctx, msg, `你抓到一只海豹！取名为${val}\n它的逃跑意愿为${random}`);
        // 保存对应数据
        console.log(stormdb)
        // 如果不存在这个ID
        if (!stormdb.get(id).exist()){
          stormdb.set(id,[])
        }
        stormdb.get(id).push({val:val,run:random}).save();
        return seal.ext.newCmdExecuteResult(true);
      }
      case 'me':{
        // 获取用户的相关信息
        let id = ctx.player.userId;
        let save = stormdb.get(id).value() // 这里就是上面存放的列表，包含{"val":val,"run":random}
        let reply = "当前拥有的海豹列表:"
        save.forEach(element => {
          reply+=`\n海豹:${element.val}，逃跑意愿:${element.run}`
        });
        seal.replyToSender(ctx, msg, reply);
        return seal.ext.newCmdExecuteResult(true);
      }
      default:{
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
    }
  }

  // 注册命令
  ext.cmdMap['seal'] = cmdSeal;
}

main();
