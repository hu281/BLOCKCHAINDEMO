const P2p = require('./P2p.js');//引入P2P模块
const Blockchain = require('./Blockchain.js');//引入区块链模块
const blockchain = new Blockchain();//创建区块链实例
const p2p = new P2p(blockchain);//创建P2P实例，传入区块链实例

function cli(vorpal){
    vorpal.use(welcome).use(connectCommand).use(discoverCommand).use(blockchainCommand).use(peersCommand).use(mineCommand).use(openCommand).delimiter('blockchain>>>>>>>>>').show();
}

module.exports = cli;

function welcome(vorpal){
    vorpal.log("welcome to blockchain cli");
    vorpal.log("help");
}
function connectCommand(vorpal){
    vorpal.command('connect <host> <port>','Connect to a new peer.eg: connect localhost 2727')
        .alias('c')
        .action(function(args,callback){
            if(args.host && args.port){
                try{
                    p2p.connectToPeer(args.host,args.port);
                }catch(err) {
                    this.log(err.message);
                }
            }
            callback();
        })
}

//发现节点指令
function discoverCommand(vorpal){
    vorpal.command('discover','Discover new peers from your connected peers')
        .alias('d')
        .action(function(args,callback){
            try{
            p2p.discoverPeers();
            }catch(err){
                this.log(err.message);
            }

            callback();
        })
}

function blockchainCommand(vorpal){
    vorpal.command('blockchain','see the current state of the blockchain.')
        //设置命令行别名
        .alias('b')

        .action(function(args,callback){
            //输出整个区块链的信息
            this.log(blockchain);
            //执行回调函数，结束命令执行
            callback();
        })
    }
function peersCommand(vorpal){
    vorpal.command('peers','get the list of connected peers.')
        .alias('p').action(function(args,callback){
            //输出所有已连接节点的信息
            p2p.forEach(peer => {
                this.log(`${peer.pxpPeer.socket._host}\n`);
            },this)
        
            callback();
        })
}

function mineCommand(vorpal){
    vorpal.command('mine <data>','mine a new block.eg: mine "Hello World"')
        .alias('m')
        .action(function(args,callback){
            if(args.data){
                blockchain.mine(args.data);
                p2p.broadcastLatest();
            }
            callback();
    })
    
}
function openCommand(vorpal){
    vorpal.command('open <port>','open a port for peer-to-peer connections.eg: open 2727')
        .alias('o')
        .action(function(args,callback){
            if(args.port){
                    if (typeof args.port === 'number') {
                        p2p.startServer(args.port);

                        this.log(`Listening on port ${args.port}`);
                    } else {
                        this.log('Invalid port number');
                    }
                }
                callback();
            })
        
}