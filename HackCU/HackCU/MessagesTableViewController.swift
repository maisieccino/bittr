//
//  MessagesTableViewController.swift
//  HackCU
//
//  Created by Harshpal Bhirth on 24/02/2019.
//  Copyright © 2019 Harshpal Bhirth. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON

class MessagesTableViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    @IBOutlet weak var tableView: UITableView!
    var messages: [String] = []
    

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return messages.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell(style: .default, reuseIdentifier: "cell")
        cell.textLabel?.text = messages[indexPath.row]
        return cell
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.delegate = self
        tableView.dataSource = self
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        messages = []
        getMessages()
    }
    
    func getMessages() {
        let from = UserDefaults.standard.value(forKey: "username") as! String
        Alamofire.request("https://651bbf54.ngrok.io/receive?user=\(from)", method: .get).responseJSON { [weak self] response in
            guard let self = self else { return }
            if let json = response.result.value {
                let JSON2 = JSON(json)
                
                for obj in JSON2.array! {
                    let message = obj["message"]
                    let from = obj["from"]
                    self.messages.append("From: \(from) Message: \(message)")
                }
                
                
                self.tableView.reloadData()
            }
        }
    }
}
